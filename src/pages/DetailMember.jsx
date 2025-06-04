import DetailTemplate from "../components/Travel/DetailTemplete";
import EditMember from "./EditMember";

export default function DetailMember() {
  return (
    <DetailTemplate
      endpoint="members"
      backTo="/team"
      renderDisplay={(data) => (
        <>
          <img src={data.profileImage} alt="preview" style={{ width: "100%", borderRadius: "8px" }} />
          <strong>{data.name}</strong>
          <p>{data.introduction}</p>
        </>
      )}
      renderEditor={(data, onDone) => (
        <EditMember member={data} onDone={onDone} />
      )}
    />
  );
}
