import { useState, useRef } from "react";
import CropModal from "../../utils/CropModal";

export default function SelectImage({ setInputs }) {
  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef();

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result); // CropModal에 전달할 원본 이미지
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedDataUrl) => {
    setInputs((prev) => ({
      ...prev,
      imageUrl: croppedDataUrl,
    }));
    setImageSrc(null); // 모달 닫기
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        ref={fileInputRef}
      />

      {imageSrc && (
        <CropModal
          imageSrc={imageSrc}
          onClose={() => setImageSrc(null)}
          onCropComplete={handleCropComplete}
        />
      )}
    </>
  );
}
