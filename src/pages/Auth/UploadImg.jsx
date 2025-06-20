import React, { useRef, useState } from "react";
import { useUser } from "../../hooks/UserContext";
import "./UploadImg.css";
import CropModal from "../../utils/CropModal";

export default function UploadImg({Shape = "round"}) {
  const { user, setUser } = useUser();
  const [preview, setPreview] = useState(user.image);
  const [imageSrc, setImageSrc] = useState(null); // 모달용
  const fileInputRef = useRef();

  const handleImageChange = async (e) => {
    const file = e.target.files[0]; // 첫 번째 파일만 사용
    if (!file) return;

    const reader = new FileReader();
    // 파일 로딩 완료 시 base64 데이터로 모달 열기
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 자르기 완료 후 이미지 저장 및 미리보기 반영
  const handleCropComplete = async (croppedImage) => {
    const res = await fetch(`http://localhost:3001/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: croppedImage }),
    });

    if (res.ok) {
      const updatedUser = { ...user, image: croppedImage };
      localStorage.setItem("user", JSON.stringify(updatedUser)); // 로컬 저장소에 업데이트
      setUser(updatedUser); // context 상태도 업데이트
      setPreview(croppedImage); // 새로운 이미지로 미리보기 갱신
    } else {
      alert("이미지 저장 실패");
    }
  };

  return (
    <>
      {/* 이미지 업로드 UI */}
      <div
        className="upload-img-wrapper"
        onClick={() => fileInputRef.current.click()} // 이미지를 클릭하면 파일 입력창 열기
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }} // 기본 input은 숨김
        />
        <img src={preview} alt="프로필" className="profile-img" />
        <div className="edit-overlay">
          <img
            src="https://img.icons8.com/?size=100&id=11612&format=png&color=ffffff"
            alt="수정 아이콘"
            className="edit-icon-img"
          />
        </div>
      </div>
      {imageSrc && (
        <CropModal
          imageSrc={imageSrc}
          onClose={() => setImageSrc(null)}
          onCropComplete={handleCropComplete}
          Shape={Shape}
        />
      )}
    </>
  );
}