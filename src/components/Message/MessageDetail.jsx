import { useState, useEffect } from "react";
import { useUser } from "../../hooks/UserContext";
import { apiGet } from "../../api/fetch";
import "./Message.css";

const MessageDetail = ({ message, onClose }) => {
  const { user } = useUser();
  const [sender, setSender] = useState(null);
  const [receiver, setReceiver] = useState(null);

  useEffect(() => {
    apiGet("users").then((users) => {
      const foundSender = users.find((u) => u.id === message.senderId);
      const foundReceiver = users.find((u) => u.id === message.receiverId);
      setSender(foundSender);
      setReceiver(foundReceiver);
    });
  }, [message]);

  return (
    <div className="message-detail">
      <div className="message-detail-header">
        <div className="message-info">
          <div className="message-meta">
            <span className="label">보낸 사람:</span>
            <span className="value">{sender?.name || "알 수 없음"}</span>
          </div>
          <div className="message-meta">
            <span className="label">받는 사람:</span>
            <span className="value">{receiver?.name || "알 수 없음"}</span>
          </div>
          <div className="message-meta">
            <span className="label">보낸 시간:</span>
            <span className="value">
              {new Date(message.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="message-detail-content">{message.content}</div>

      <div className="message-detail-footer">
        {message.senderId !== user.id && (
          <button
            className="reply-button"
            onClick={() => {
              // 답장 기능 구현 예정
              console.log("답장하기");
            }}
          >
            답장하기
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageDetail;
