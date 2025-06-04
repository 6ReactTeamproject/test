import CreateButton from "./CreateButton";

export default function CreateTravelIntro() {
  return (
    <CreateButton
      table="semester"
      redirect="/intro"
      empty={(data) => data.title?.trim() && data.description?.trim()}
    >
      <>
        <input name="title" placeholder="현지학기제 장소" />
        <textarea name="description" placeholder="현지학기제 소개" />
      </>
    </CreateButton>
  );
}
