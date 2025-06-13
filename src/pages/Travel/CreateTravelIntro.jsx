import { useState } from "react";
import CreateButton from "../../components/Travel&Member/CreateButton";
import SelectImage from "../../utils/SelectImage.jsx";

export default function CreateTravelIntro() {
  const [imageUrl, setImageUrl] = useState("");
  const [inputs, setInputs] = useState({});

  const isFilled = (data) => data.title?.trim() && data.description?.trim(); // 이미지 제외

  return (
    <CreateButton
      endpoint="semester"
      redirect="/intro"
      empty={isFilled}
      inputs={inputs}
      setInputs={setInputs}
    >
      <input name="title" placeholder="현지학기제 장소" />
      <textarea name="description" placeholder="현지학기제 소개" />
      <SelectImage setInputs={setInputs} setProfileImage={setImageUrl} />
      {imageUrl && (
        <img
          src={imageUrl}
          alt="미리보기"
          style={{ maxWidth: "100%", marginTop: "10px" }}
        />
      )}
    </CreateButton>
  );
}
