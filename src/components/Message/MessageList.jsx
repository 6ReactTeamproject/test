import React, { useState, useEffect } from "react";
import { apiGet, apiPatch } from "../../api/fetch";
import { useUser } from "../../hooks/UserContext";
import { useNavigate } from "react-router-dom";

const MessageList = ({ activeTab, onSelectMessage, selectedMessage }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user) return;

    apiGet("users")
      .then((data) => setUsers(data))
      .catch((err) => console.error("사용자 목록 로딩 실패:", err));

    apiGet("messages")
      .then((data) => {
        const filteredMessages = data.filter((message) =>
          activeTab === "received"
            ? message.receiverId === user.id
            : message.senderId === user.id
        );
        setMessages(filteredMessages);
      })
      .catch((err) => console.error("메시지 로딩 실패:", err));
  }, [user, activeTab]);

  const handleMessageClick = async (message) => {
    if (activeTab === "received" && !message.isRead) {
      try {
        await apiPatch("messages", message.id, { isRead: true });
        setMessages(
          messages.map((msg) =>
            msg.id === message.id ? { ...msg, isRead: true } : msg
          )
        );
      } catch (err) {
        console.error("읽음 상태 변경 실패:", err);
      }
    }
    onSelectMessage(message);
  };

  if (!user) {
    return null;
  }

  const getSenderName = (userId) => {
    const foundUser = users.find((u) => u.id === userId);
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
                  ? getSenderName(message.senderId)
                  : getSenderName(message.receiverId)}
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
