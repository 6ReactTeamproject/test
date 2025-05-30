  import { useNavigate } from "react-router-dom";
import { UserSection } from "./components/Travel/Usersection";

  export default function Home() {
    const navigate = useNavigate();

    return (
      <>
      <div>
        <UserSection />
      </div>
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>메인 화면</h1>
        <button onClick={() => navigate("/login")}>로그인</button>
        <br /><br />
        <button onClick={() => navigate("/signup")}>회원가입</button> {/* ✅ 추가 */}
        <br /><br />
        <button onClick={() => navigate("/intro")}>여행 소개</button>
        <br /><br />
        <button onClick={() => navigate("/team")}>멤버 소개</button>
        <br /><br />
        <button onClick={() => navigate("/board")}>게시판</button>
      </div>
      </>
    );
  }
