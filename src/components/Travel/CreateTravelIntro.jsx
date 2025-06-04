
import { useState } from "react";
import CreateButton from "./CreateButton";

export default function CreateTravelIntro() {
  const [imageUrl, setImageUrl] = useState("");

  const isFilled = (data) =>
    data.title?.trim() &&
    data.description?.trim();

  return (
    <CreateButton
      table="semester"
      redirect="/intro"
      empty={isFilled}
    >
      <>
        <h2>현지학기제 소개 작성</h2>

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
                setImageUrl(reader.result); // base64 저장
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        <input type="hidden" name="imageUrl" value={imageUrl} />
      </>
    </CreateButton>
  );
}
