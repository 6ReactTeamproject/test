import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropUtils";
import "./CropModal.css";

export default function CropModal({ imageSrc, onClose, onCropComplete, Shape }) {
<<<<<<< Updated upstream:src/pages/Auth/CropModal.jsx
  const [crop, setCrop] = useState({ x: 0, y: 0 }); // 자르기 위치 상태
  const [zoom, setZoom] = useState(1); // 확대 비율 상태
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); // 잘린 영역 픽셀 정보

  const [aspect, setAspect] = useState(Shape === 'round' ? 1 / 1 : 3 / 4); // 자르기 비율 (원형은 1:1, 사각형 기본은 3:4)

  // 자르기 완료 시 호출되는 콜백 (자른 영역 정보 저장)
=======
  // 이미지 자르기 시작 위치 (x, y)
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  // 줌 비율
  const [zoom, setZoom] = useState(1);

  // 사용자가 자른 실제 픽셀 영역 정보
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // 자르기 비율 설정 (원형은 1:1, 사각형은 기본값 3:4)
  const [aspect, setAspect] = useState(Shape === 'round' ? 1 / 1 : 3 / 4);

  // 사용자가 자르기 작업을 완료했을 때 실행되는 콜백
>>>>>>> Stashed changes:src/utils/CropModal.jsx
  const handleCropComplete = useCallback((_, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

<<<<<<< Updated upstream:src/pages/Auth/CropModal.jsx
  // 저장 버튼 클릭 시 잘린 이미지를 생성하여 상위 컴포넌트에 전달
  const handleSave = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(croppedImage); // 잘린 이미지 콜백으로 전달
    onClose(); // 모달 닫기
=======
  // 저장 버튼 클릭 시 잘린 이미지를 생성하고 상위 컴포넌트로 전달
  const handleSave = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(croppedImage);  // 잘린 이미지 콜백 전달
    onClose();                     // 모달 닫기
>>>>>>> Stashed changes:src/utils/CropModal.jsx
  };

  return (
    <div className="crop-modal-overlay">
      <div className="crop-modal">
        {/* 실제 이미지 크롭 UI */}
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
<<<<<<< Updated upstream:src/pages/Auth/CropModal.jsx
          cropShape={Shape} // 'round' 또는 'square'
          showGrid={false} // 보조선 비활성화
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      </div>

=======
          cropShape={Shape}     // 자르기 모양: 'round' 또는 'square'
          showGrid={false}      // 자르기 가이드라인 비활성화
          onCropChange={setCrop}         // 자르기 위치 변경 핸들러
          onZoomChange={setZoom}         // 줌 변경 핸들러
          onCropComplete={handleCropComplete} // 자르기 완료 시
        />
      </div>

      {/* 하단 컨트롤 영역 */}
>>>>>>> Stashed changes:src/utils/CropModal.jsx
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

<<<<<<< Updated upstream:src/pages/Auth/CropModal.jsx
        {/* 비율 선택은 사각형 모드일 때만 제공 */}
=======
        {/* 비율 선택은 사각형 모드에서만 표시 */}
>>>>>>> Stashed changes:src/utils/CropModal.jsx
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

<<<<<<< Updated upstream:src/pages/Auth/CropModal.jsx
        <button onClick={onClose}>취소</button>
        <button onClick={handleSave}>저장</button>
=======
        {/* 버튼: 작업 취소 또는 저장 */}
        <button type="button" onClick={onClose}>취소</button>
        <button type="button" onClick={handleSave}>저장</button>
>>>>>>> Stashed changes:src/utils/CropModal.jsx
      </div>
    </div>
  );
}
