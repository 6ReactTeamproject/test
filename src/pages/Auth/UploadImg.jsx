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
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result); // 모달 열기
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = async (croppedImage) => {
    const res = await fetch(`http://localhost:3001/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: croppedImage }),
    });

    if (res.ok) {
      const updatedUser = { ...user, image: croppedImage };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setPreview(croppedImage);
    } else {
      alert("이미지 저장 실패");
    }
  };

  return (
    <>
      <div className="upload-img-wrapper" onClick={() => fileInputRef.current.click()}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
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
