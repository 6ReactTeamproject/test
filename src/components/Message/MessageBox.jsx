import { useState, useEffect } from "react";
import { useUser } from "../../hooks/UserContext";
import MessageList from "./MessageList";
import MessageDetail from "./MessageDetail";
import MessageForm from "./MessageForm";
import "./Message.css";

const MessageBox = () => {
  const { user } = useUser();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [activeTab, setActiveTab] = useState("received");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [user]);
  if (!user) {
    return null;
  }

  return (
    <div className="message-box">
      <div className="message-header">
        <div className="message-tabs">
          <button
            className={activeTab === "received" ? "active" : ""}
            onClick={() => {
              setActiveTab("received");
              setSelectedMessage(null);
            }}
          >
            받은 쪽지
          </button>
          <button
            className={activeTab === "sent" ? "active" : ""}
            onClick={() => {
              setActiveTab("sent");
              setSelectedMessage(null);
            }}
          >
            보낸 쪽지
          </button>
        </div>
        <button
          className="write-button"
          onClick={() => {
            setShowForm(true);
            setSelectedMessage(null);
          }}
        >
          쪽지 작성
        </button>
      </div>

      <div className="message-container">
        <div className="message-list-container">
          <MessageList
            activeTab={activeTab}
            onSelectMessage={setSelectedMessage}
            selectedMessage={selectedMessage}
          />
        </div>

        <div className="message-detail-container">
          {showForm ? (
            <MessageForm onClose={() => setShowForm(false)} />
          ) : selectedMessage ? (
            <MessageDetail
              message={selectedMessage}
              onClose={() => setSelectedMessage(null)}
            />
          ) : (
            <div className="no-selection">
              {activeTab === "received" ? "받은" : "보낸"} 쪽지를 선택해주세요
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
