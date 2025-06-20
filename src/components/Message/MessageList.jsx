import React, { useState, useEffect } from "react";
import { apiGet, apiPatch } from "../../api/fetch";
import { useUser } from "../../hooks/UserContext";

const MessageList = ({
  activeTab,
  onSelectMessage,
  selectedMessage,
  showForm,
}) => {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user) return;

    apiGet("users")
      .then((data) => setUsers(data))
      .catch((err) => console.error("사용자 목록 로딩 실패:", err));

    // 메시지 목록 불러오기 및 탭에 따라 필터링
    apiGet("messages")
      .then((data) => {
        const filteredMessages = data.filter((message) =>
          activeTab === "received"
            ? String(message.receiverId) === String(user.id) // 받은 쪽지 필터
            : String(message.senderId) === String(user.id) // 보낸 쪽지 필터
        );
        setMessages(filteredMessages);
      })
      .catch((err) => console.error("메시지 로딩 실패:", err));
  }, [user, activeTab, showForm]);

  // 메시지 클릭 시 읽음 처리 및 선택
  const handleMessageClick = async (message) => {
    if (activeTab === "received" && !message.isRead) {
      try {
        // 메시지 읽음 상태 업데이트
        await apiPatch("messages", message.id, { isRead: true });
        // 로컬 상태에서도 읽음 상태 반영
        setMessages(
          messages.map((msg) =>
            msg.id === message.id ? { ...msg, isRead: true } : msg
          )
        );
      } catch (err) {
        console.error("읽음 상태 변경 실패:", err);
      }
    }
    // 선택된 메시지 설정
    onSelectMessage(message);
  };

  if (!user) {
    // 로그인 상태가 아니면 컴포넌트 렌더링 안 함
    return null;
  }

  // userId로 사용자 이름 찾기
  const getSenderName = (userId) => {
    const foundUser = users.find((u) => String(u.id) === String(userId));
    return foundUser ? foundUser.name : "알 수 없음";
  };

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <p className="no-messages">쪽지가 없습니다.</p>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`message-item ${
              !message.isRead && activeTab === "received" ? "unread" : ""
            } 
                       ${selectedMessage?.id === message.id ? "selected" : ""}`}
            onClick={() => handleMessageClick(message)}
          >
            <div className="message-preview">
              <span className="sender">
                {activeTab === "received"
                  ? getSenderName(message.senderId) // 받은 쪽지일 땐 보낸 사람 이름 표시
                  : getSenderName(message.receiverId)} {/* 보낸 쪽지일 땐 받는 사람 이름 표시 */}
              </span>
              <span className="date">
                {new Date(message.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="message-content-preview">{message.title}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default MessageList;
