import EditForm from "../components/Travel/EditForm";

export default function EditTravelIntro({ travelPlace, onDone }) {
  return (
    <EditForm
      data={travelPlace}
      endpoint="semester"
      heading="장소 정보 수정"
      onDone={onDone}
      fields={[
        { label: "장소명", key: "title" },
        { label: "이미지 링크", key: "imageUrl" },
        { label: "장소 소개", key: "description", type: "textarea" }
      ]}
    />
  );
}
