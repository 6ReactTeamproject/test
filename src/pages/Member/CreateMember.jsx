import CreateButton from "../../components/Travel&Member/CreateButton";
import SelectImage from "../../components/Travel&Member/SelectImage.jsx";

export default function CreateMember() {
  const isFilled = (data) =>
    data.name?.trim() && data.role?.trim() && data.introduction?.trim();

  return (
    <CreateButton
      endpoint="members"
      redirect="/team"
      empty={isFilled}
    >
      <input name="name" placeholder="이름" />
      <input name="role" placeholder="역할" />
      <textarea name="introduction" placeholder="조원 소개" />
      <SelectImage />
    </CreateButton>
  );
}
