import React, { useRef, useState } from "react";
import CropModal from "./CropModal";
import "../styles/PostImgUploader.css";

export default function PostImgUploader({ onChangeImage, Shape = "square" }) {
  const [preview, setPreview] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (cropped) => {
    setPreview(cropped);
    if (onChangeImage) {
      onChangeImage(cropped);
    }
    setImageSrc(null);
  };


  return (
  <>
    {/* 업로드 버튼 */}
    <button
      type="button"
      className="image-upload-button"
      onClick={() => fileInputRef.current.click()}
    >
      이미지 선택
    </button>
    <br />
    {/* 이미지 input */}
    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      onChange={handleImageChange}
      style={{ display: "none" }}
    />

    {/* 미리보기 */}
    <div className="post-image-uploader">
      {preview ? (
        <img src={preview} alt="게시글 이미지" className="post-detail-image" />
      ) : (
        <div className="placeholder-image">선택된 이미지가 없습니다</div>
      )}
    </div>

    {/* 자르기 모달 */}
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
