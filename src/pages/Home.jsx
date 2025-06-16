import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/UserContext";
import TopPosts from "../TopPosts";

export default function Home() {
  const navigate = useNavigate();
  const { user: currentUser } = useUser();

  return (
    <>
      {console.log(currentUser)}
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>메인 화면</h1>
      </div>
      <TopPosts/>
    </>
  );
}
