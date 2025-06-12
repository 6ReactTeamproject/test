import { useState } from "react";
import CreateButton from "../../components/Travel&Member/CreateButton";

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

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setImageUrl(reader.result);
              setInputs((prev) => ({
                ...prev,
                imageUrl: reader.result,
              }));
            };
            reader.readAsDataURL(file);
          }
        }}
      />
    </CreateButton>
  );
}
