import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/UserContext";
import "../styles/layout.css";
import TopPosts from "../TopPosts";
import TravelCarousel from "../components/Travel&Member/TravelCarousel";

export default function Home() {
  const navigate = useNavigate(); // 페이지 이동을 위한 함수
  const { user: currentUser } = useUser(); // 현재 로그인된 사용자 정보

  return (
    <>
      {console.log(currentUser)} {/* 디버깅용 사용자 정보 출력 */}
      
      {/* 홈 화면 상단에 여행 장소 캐러셀 표시 */}
      <div className="home-container">
        <h1 className="home-title">메인 화면</h1>
        <TravelCarousel />
      </div>
      
      {/* 하단에 인기 게시글 목록 표시 */}
      <TopPosts />
    </>
  );
}
