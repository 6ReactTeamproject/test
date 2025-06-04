import { useNavigate } from "react-router-dom";
import { useUser } from "./components/Travel/UserContext";

export default function Home() {
  const navigate = useNavigate();
  const { user: currentUser } = useUser();

  return (
    <>
      {console.log(currentUser)}
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>메인 화면</h1>
        {/* {currentUser ? (
          <></>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>로그인</button>
            <br />
            <br />
            <button onClick={() => navigate("/signup")}>회원가입</button>
            <br />
            <br />
          </>
        )} */}
        <button onClick={() => navigate("/intro")}>여행 소개</button>
        <br />
        <br />
        <button onClick={() => navigate("/team")}>멤버 소개</button>
        <br />
        <br />
        <button onClick={() => navigate("/post")}>게시판</button>
      </div>
    </>
  );
}
