import React, { useState, useEffect } from "react";
import { apiPost, apiGet } from "../../api/fetch";
import { useUser } from "../../hooks/UserContext";

const MessageForm = ({ onClose }) => {
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState({
    receiverId: "",
    title: "",
    content: "",
    senderId: user.id,
    createdAt: new Date().toISOString(),
    isRead: false,
  });

  useEffect(() => {
    apiGet("users")
      .then((data) => setUsers(data))
      .catch((err) => console.error("사용자 목록 로딩 실패:", err));
  }, []);

  const handleChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessage = {
      senderId: user.id,
      receiverId: message.receiverId,
      title: message.title,
      content: message.content,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    try {
      await apiPost("messages", newMessage);
      setMessage({
        receiverId: "",
        title: "",
        content: "",
        senderId: user.id,
        createdAt: new Date().toISOString(),
        isRead: false,
      });
      onClose();
    } catch (error) {
      console.error("쪽지 전송 실패:", error);
    }
  };

  return (
    <div className="message-form">
      <h3>쪽지 작성</h3>
      <form onSubmit={handleSubmit}>
        <select
          name="receiverId"
          value={message.receiverId}
          onChange={handleChange}
          required
        >
          <option value="">받는 사람 선택</option>
          {users
            .filter((u) => u.id !== user?.id)
            .map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
        </select>
        <input
          type="text"
          name="title"
          value={message.title}
          onChange={handleChange}
          placeholder="제목을 입력하세요"
          required
        />
        <textarea
          name="content"
          value={message.content}
          onChange={handleChange}
          placeholder="쪽지 내용을 입력하세요"
          required
        />
        <div className="form-buttons">
          <button type="submit">전송</button>
          <button
            type="button"
            onClick={() => {
              setMessage({
                receiverId: "",
                title: "",
                content: "",
                senderId: user.id,
                createdAt: new Date().toISOString(),
                isRead: false,
              });
              onClose();
            }}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
