import React, { useRef, useState } from "react";
import CropModal from "./CropModal";
import "../styles/PostImgUploader.css";

export default function PostImgUploader({ onChangeImage, Shape = "square" }) {
  const [preview, setPreview] = useState(null); // 최종 잘린 이미지 미리보기
  const [imageSrc, setImageSrc] = useState(null); // 원본 이미지 데이터 (CropModal에서 사용)
  const fileInputRef = useRef(); // 숨겨진 파일 input 제어용 참조

  // 이미지 선택 시 호출되는 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result); // 이미지 로딩 완료 후 자르기 모달 열기
    };
    reader.readAsDataURL(file); // 이미지 파일을 base64로 읽기
  };

  // 이미지 자르기 완료 후 실행되는 콜백
  const handleCropComplete = (cropped) => {
    setPreview(cropped); // 미리보기용으로 자른 이미지 설정
    if (onChangeImage) {
      onChangeImage(cropped); // 부모 컴포넌트로 전달
    }
    setImageSrc(null); // 모달 닫기
  };

  return (
    <>
      {/* 항상 보이는 업로드 버튼 */}
      <button
        type="button"
        className="image-upload-button"
        onClick={() => fileInputRef.current.click()}
      >
        이미지 선택
      </button>

      {/* 숨겨진 파일 input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />

      {/* 미리보기 or placeholder */}
      <div className="post-image-uploader">
        {preview ? (
          // 자른 이미지가 있으면 보여주기
          <img src={preview} alt="게시글 이미지" className="post-detail-image" />
        ) : (
          // 이미지가 없으면 안내 텍스트 표시
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
