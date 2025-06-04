import IntroList from "../components/Travel/IntroList";

export default function TeamIntro() {
  return (
    <IntroList
      heading="조원 소개"
      endpoint="members"
      primaryKey="name"
      secondaryKey="introduction"
      imageKey="profileImage"
      pathPrefix="team"
    />
  );
}
