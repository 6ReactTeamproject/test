import { useState } from "react";
import CreateButton from "../../components/Travel&Member/CreateButton";
import SelectImage from "../../utils/SelectImage.jsx";

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

      <SelectImage setInputs={setInputs} setProfileImage={setProfileImage} />
      {profileImage && (
        <img
          src={profileImage}
          alt="미리보기"
          style={{ maxWidth: "100%", marginTop: "10px" }}
        />
      )}

    </CreateButton>
  );
}
