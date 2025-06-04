import { useState } from "react";
import CreateButton from "../Travel/CreateButton";

export default function CreateMember() {
  const [profileImage, setProfileImage] = useState("");

  const isFilled = (data) =>
    data.name?.trim() &&
    data.role?.trim() &&
    data.introduction?.trim();

  return (
    <CreateButton
      table="members"
      redirect="/team"
      empty={isFilled}
    >
      <>
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
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        {/* 이미지 값은 inputs가 아닌 profileImage로 따로 관리되므로, props로는 넘기지 않음 */}
        <input type="hidden" name="profileImage" value={profileImage} />
      </>
    </CreateButton>
  );
}
