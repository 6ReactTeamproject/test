import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import './travel.css';

export default function CreateTravelIntro() {
  const [travelTitle, setTravelTitle] = useState("");
  const [travelContent, setTravelContent] = useState("");
  const [imgLink, setImgLink] = useState("");
  const navigate = useNavigate();
  const { user } = useUser();

  const defaultImageUrl = "https://plus.unsplash.com/premium_photo-1666700698920-d2d2bba589f8?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요한 기능입니다.");
      navigate("/login");
    }
  }, [user, navigate]);

  function handleCreatePost() {
    if (!travelTitle.trim() || !travelContent.trim()) {
      alert("제목과 소개는 필수 입력입니다.");
      return;
    }

    const imageToUse = imgLink.trim() || defaultImageUrl;

    fetch("http://localhost:3001/semester", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: travelTitle,
        description: travelContent,
        imageUrl: imageToUse,
        authorId: user.id
      }),
    }).then(() => {
      alert("게시글이 생성되었습니다.");
      navigate("/intro");
    });
  }

  return (
    <div className="form-container">
      <input
        value={travelTitle}
        onChange={(e) => setTravelTitle(e.target.value)}
        placeholder="현지학기제 장소"
      />
      <input
        value={imgLink}
        onChange={(e) => setImgLink(e.target.value)}
        placeholder="이미지 링크 입력"
      />
      <textarea
        value={travelContent}
        onChange={(e) => setTravelContent(e.target.value)}
        placeholder="현지학기제 소개"
      />
      <div className="button-group">
        <button onClick={handleCreatePost} className="add-button">등록</button>
        <button onClick={() => navigate("/intro")} className="cancel-button">취소</button>
      </div>
    </div>
  );
}
