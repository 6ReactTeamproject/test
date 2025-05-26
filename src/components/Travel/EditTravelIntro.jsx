import { useState } from "react";
import './travel.css';

export default function EditTravelIntro({ travelPlace, onDone }) {
  const [travelTitle, setTravelTitle] = useState(travelPlace.title);
  const [travelContent, setTravelContent] = useState(travelPlace.description);
  const [imgLink, setImgLink] = useState(travelPlace.imageUrl);

  const handleUpdate = () => {
    fetch(`http://localhost:3001/semester/${travelPlace.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: travelTitle,
        description: travelContent,
        imageUrl: imgLink
      })
    }).then(() => {
      alert("게시글이 수정되었습니다.");
      onDone({
        ...travelPlace,
        title: travelTitle,
        description: travelContent,
        imageUrl: imgLink
      });
    });
  };

  return (
    <div className="form-container">
      <label>장소명</label>
      <input value={travelTitle} onChange={(e) => setTravelTitle(e.target.value)} />

      <label>이미지 링크</label>
      <input value={imgLink} onChange={(e) => setImgLink(e.target.value)} />

      <label>장소 소개</label>
      <textarea value={travelContent} onChange={(e) => setTravelContent(e.target.value)} />

      <div className="button-group">
        <button onClick={handleUpdate} className="add-button">💾 저장</button>
        <button onClick={() => onDone(travelPlace)} className="cancel-button">❌ 취소</button>
      </div>
    </div>
  );
}
