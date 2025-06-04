import IntroList from "../components/Travel/IntroList";

export default function TravelIntro() {
  return (
    <IntroList
      heading="현지학기제 소개"
      endpoint="semester"
      primaryKey="title"
      secondaryKey="description"
      imageKey="imageUrl"
      pathPrefix="intro"
    />
  );
}
