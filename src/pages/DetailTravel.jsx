import DetailTemplate from "../components/Travel/DetailTemplete";
import EditTravelIntro from "./EditTravelIntro";

export default function DetailTravel() {
  return (
    <DetailTemplate
      endpoint="semester"
      backTo="/intro"
      renderDisplay={(data) => (
        <>
          <img src={data.imageUrl} alt="preview" style={{ width: "100%", borderRadius: "8px" }} />
          <h3>{data.title}</h3>
          <p>{data.description}</p>
        </>
      )}
      renderEditor={(data, onDone) => (
        <EditTravelIntro travelPlace={data} onDone={onDone} />
      )}
    />
  );
}
