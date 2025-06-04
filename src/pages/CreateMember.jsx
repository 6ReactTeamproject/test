import { useState } from "react";
import CreateButton from "../components/Travel/CreateButton";
import ImageUpload from "../components/common/ImageUpload";

export default function CreateMember() {
  const [inputs, setInputs] = useState({});

  const isFilled = (data) =>
    data.name?.trim() && data.introduction?.trim();

  return (
    <CreateButton
      endpoint="members"
      redirect="/team"
      empty={isFilled}
      inputs={inputs}
      setInputs={setInputs}
    >
      <input name="name" placeholder="이름" />
      <ImageUpload
        name="profileImage"
        onLoad={(result) =>
          setInputs((prev) => ({ ...prev, profileImage: result }))
        }
      />
      <textarea name="introduction" placeholder="조원 소개" />
    </CreateButton>
  );
}
