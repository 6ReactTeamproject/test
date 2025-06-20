import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropUtils";
import "./CropModal.css";

export default function CropModal({ imageSrc, onClose, onCropComplete, Shape }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 }); // 자르기 위치 상태
  const [zoom, setZoom] = useState(1); // 확대 비율 상태
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); // 잘린 영역 픽셀 정보

  const [aspect, setAspect] = useState(Shape === 'round' ? 1 / 1 : 3 / 4); // 자르기 비율 (원형은 1:1, 사각형 기본은 3:4)

  // 자르기 완료 시 호출되는 콜백 (자른 영역 정보 저장)
  const handleCropComplete = useCallback((_, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  // 저장 버튼 클릭 시 잘린 이미지를 생성하여 상위 컴포넌트에 전달
  const handleSave = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(croppedImage); // 잘린 이미지 콜백으로 전달
    onClose(); // 모달 닫기
  };

  return (
    <div className="crop-modal-overlay">
      <div className="crop-modal">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          cropShape={Shape} // 'round' 또는 'square'
          showGrid={false} // 보조선 비활성화
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      </div>

      <div className="crop-controls">
        {/* 줌 조절 슬라이더 */}
        <label style={{ color: "white" }}>
          줌:
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </label>

        {/* 비율 선택은 사각형 모드일 때만 제공 */}
        {Shape == 'square' && (
          <label style={{ color: "white" }}>
            비율:
            <select value={aspect} onChange={(e) => setAspect(Number(e.target.value))}>
              <option value={1}>1:1</option>
              <option value={4 / 3}>4:3</option>
              <option value={16 / 9}>16:9</option>
              <option value={3 / 4}>3:4</option>
            </select>
          </label>
        )}

        <button onClick={onClose}>취소</button>
        <button onClick={handleSave}>저장</button>
      </div>
    </div>
  );
}
