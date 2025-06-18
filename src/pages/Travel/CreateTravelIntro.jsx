import CreateButton from "../../components/Travel&Member/CreateButton";
import SelectImage from "../../components/Travel&Member/SelectImage.jsx";

export default function CreateTravelIntro() {
  const isFilled = (data) =>
    data.title?.trim() && data.description?.trim();

  return (
    <CreateButton
      endpoint="semester"
      redirect="/intro"
      empty={isFilled}
    >
      <input name="title" placeholder="현지학기제 장소" />
      <textarea name="description" placeholder="현지학기제 소개" />
      <SelectImage cropShape="square" />
    </CreateButton>
  );
}
