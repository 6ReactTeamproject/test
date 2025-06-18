import React from "react";
import { useUser } from "../../hooks/UserContext";
import UploadImg from "./UploadImg";
import GitForm from "./GitForm";
import Sidebar from "./Sidebar";
import "./MyPage.css";
import SearchBar from "../../components/Board/SearchBar";

export default function MyPage() {
  const { user } = useUser();

  if (!user) return <p>로그인이 필요합니다.</p>;

  // 현재 경로가 정확히 "/mypage"일 때만 기본 프로필 화면 출력

  return (
    <div className="mypage-container">
      <Sidebar/>

      <div className="mypage-main">
          <>
            <h2>마이페이지</h2>
            <div className="profile-card">
              <UploadImg cropShape="round" />

              <div className="profile-info">
                <h3>{user.name}</h3>
                <p>아이디 : {user.loginId}</p>
                <p>등급 : {user.grade}</p>
                <GitForm />
              </div>

            </div>
            <h2>내 글 조회</h2>
            <div className="MyPostSearch">
              <SearchBar />
            </div>
          </>
      </div>
    </div>
  );
}
