import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropUtils";
import "./CropModal.css";

export default function CropModal({ imageSrc, onClose, onCropComplete }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [aspect, setAspect] = useState(1); // 기본 정사각형
  const [cropShape, setCropShape] = useState("round"); // 기본 원형

  const handleCropComplete = useCallback((_, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleSave = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(croppedImage);
    onClose();
  };

  return (
    <div className="crop-modal-overlay">
      <div className="crop-modal">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          cropShape={cropShape}
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      </div>
      <div className="crop-controls">
          {/* 줌 슬라이더 */}
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

          {/* 자르기 비율 선택 */}
          <label style={{ color: "white" }}>
            비율:
            <select value={aspect} onChange={(e) => setAspect(Number(e.target.value))}>
              <option value={1}>1:1</option>
              <option value={4 / 3}>4:3</option>
              <option value={16 / 9}>16:9</option>
              <option value={3 / 4}>3:4</option>
            </select>
          </label>

          {/* 모양 선택 */}
          <label style={{ color: "white" }}>
            모양:
            <select value={cropShape} onChange={(e) => setCropShape(e.target.value)}>
              <option value="rect">사각형</option>
              <option value="round">원형</option>
            </select>
          </label>

          <button onClick={onClose}>취소</button>
          <button onClick={handleSave}>저장</button>
        </div>
    </div>
  );
}
