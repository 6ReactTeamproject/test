import { useState } from "react";
import CreateButton from "../components/Travel/CreateButton";

export default function CreateMember() {
  const [profileImage, setProfileImage] = useState("");
  const [inputs, setInputs] = useState({});

  const isFilled = (data) =>
    data.name?.trim() && data.role?.trim() && data.introduction?.trim();

  return (
    <CreateButton
      endpoint="members"
      redirect="/team"
      empty={isFilled}
      inputs={inputs}
      setInputs={setInputs}
    >
      <input name="name" placeholder="이름" />
      <input name="role" placeholder="역할" />
      <textarea name="introduction" placeholder="조원 소개" />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setProfileImage(reader.result);
              setInputs(prev => ({
                ...prev,
                profileImage: reader.result
              }));
            };
            reader.readAsDataURL(file);
          }
        }}
      />
    </CreateButton>
  );
}
