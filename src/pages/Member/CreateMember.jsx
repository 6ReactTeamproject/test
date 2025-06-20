import CreateButton from "../../components/Travel&Member/CreateButton";
import PostImgUploader from "../../utils/PostImgUploader.jsx";

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
      <PostImgUploader />
    </CreateButton>
  );
}
