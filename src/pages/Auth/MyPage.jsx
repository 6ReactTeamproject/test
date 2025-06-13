import React from "react";
import { useUser } from "../../hooks/UserContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";

export default function MyPage() {
  const { user } = useUser();

  if (!user) return <p>로그인이 필요합니다.</p>;

  return (
    <div className="mypage-container">
      <div className="sidebar">
        <Link to="/mypage/message">쪽지함</Link>
        <Link to="/mypage/nickname">닉네임 변경</Link>
        <Link to="/mypage/password">비밀번호 변경</Link>
      </div>

      <div className="mypage-main">
        <h2>마이페이지</h2>
        <p>여기에 오른쪽 콘텐츠가 표시됩니다.</p>
      </div>
    </div>
  );
}
