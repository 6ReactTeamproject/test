import EditForm from "../components/Travel/EditForm";

export default function EditMember({ member, onDone }) {
  return (
    <EditForm
      data={member}
      endpoint="members"
      heading="조원 정보 수정"
      onDone={onDone}
      fields={[
        { label: "이름", key: "name" },
        { label: "이미지 업로드", key: "profileImage", type: "image" },
        { label: "소개", key: "introduction", type: "textarea" }
      ]}
    />
  );
}
