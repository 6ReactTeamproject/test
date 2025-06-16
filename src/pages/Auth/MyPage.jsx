import React from "react";
import { useUser } from "../../hooks/UserContext";
import { Link } from "react-router-dom";
import UploadImg from "./UploadImg";
import GitForm from "./GitForm";
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
        <div className="profile-card">
          <UploadImg />

          <div className="profile-info">
            <h3>{user.name}</h3>
            <p>아이디 : {user.loginId}</p>
            <p>등급   : {user.grade}</p>

            <GitForm />
          </div>
        </div>
      </div>
    </div>
  );
}
