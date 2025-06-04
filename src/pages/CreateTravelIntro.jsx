import { useState } from "react";
import CreateButton from "../components/Travel/CreateButton";
import ImageUpload from "../components/common/ImageUpload";

export default function CreateTravelIntro() {
  const [inputs, setInputs] = useState({});

  const isFilled = (data) =>
    data.title?.trim() && data.description?.trim();

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
      <ImageUpload
        name="imageUrl"
        onLoad={(result) =>
          setInputs((prev) => ({ ...prev, imageUrl: result }))
        }
      />
    </CreateButton>
  );
}
