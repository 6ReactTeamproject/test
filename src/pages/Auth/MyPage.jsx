import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/UserContext";
import UploadImg from "./UploadImg";              
import GitForm from "./GitForm";                 
import Sidebar from "./Sidebar";                 
import { Link } from "react-router-dom";
import "./MyPage.css";

export default function MyPage() {
  const { user } = useUser(); // 현재 로그인한 사용자 정보 가져오기
  const [myPosts, setMyPosts] = useState([]);       // 내가 작성한 게시판 글 목록 상태
  const [myMembers, setMyMembers] = useState([]);   // 내가 작성한 멤버 소개 글 목록 상태
  const [myTravels, setMyTravels] = useState([]);   // 내가 작성한 여행 소개 글 목록 상태

  useEffect(() => {
    if (!user) return; // 로그인한 사용자가 없으면 fetch 요청을 하지 않음

    // 게시판 글 가져오기 (userId 기준으로 내 글만 필터링)
    fetch("http://localhost:3001/posts")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(item => String(item.userId) === String(user.id)); // userId가 현재 사용자와 같은 게시글만 필터링
        setMyPosts(filtered); // 상태에 저장하여 화면에 표시할 수 있게 함
      });

    // 멤버 소개 글 가져오기 (authorId 기준)
    fetch("http://localhost:3001/members")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(item => String(item.authorId) === String(user.id)); // authorId가 현재 사용자와 같은 항목만 필터링
        setMyMembers(filtered);
      });

    // 여행 소개 글 가져오기 (semester 엔드포인트, authorId 기준)
    fetch("http://localhost:3001/semester")
      .then(res => res.json())
      .then(data => {
        const filtered = Array.isArray(data)
          ? data.filter(item => String(item.authorId) === String(user.id)) // authorId가 일치하는 여행 소개만 필터링
          : [];
        setMyTravels(filtered);
      });
  }, [user]);

  // 로그인하지 않은 사용자는 마이페이지 접근 불가
  if (!user) return <p>로그인이 필요합니다.</p>;

  return (
    <div className="mypage-container">
      {/* 마이페이지 좌측 사이드바 (쪽지함, 닉네임 변경 등) */}
      <Sidebar />

      <div className="mypage-main">
        <h2>마이페이지</h2>

        {/* 프로필 정보 카드 (프로필 이미지, 이름, 아이디, 등급, 깃허브 등록) */}
        <div className="profile-card">
          <UploadImg />
          <div className="profile-info">
            <h3>{user.name}</h3>
            <p>아이디 : {user.loginId}</p>
            <p>등급 : {user.grade}</p>
            <GitForm />
          </div>
        </div>

        <h2>내가 쓴 글</h2>
        <div className="my-articles">
          {/* 내가 작성한 게시판 글 목록 */}
          <h3>📌 게시판</h3>
          <ul>
            {myPosts.length > 0 ? (
              myPosts.map(post => (
                <li key={post.id}>
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </li>
              ))
            ) : (
              <li>작성한 게시판 글이 없습니다.</li>
            )}
          </ul>

          {/* 내가 작성한 멤버 소개 글 목록 */}
          <h3>👥 멤버 소개</h3>
          <ul>
            {myMembers.length > 0 ? (
              myMembers.map(member => (
                <li key={member.id}>
                  <Link to={`/team/${member.id}`}>{member.name || "제목 없음"}</Link>
                </li>
              ))
            ) : (
              <li>작성한 멤버 소개 글이 없습니다.</li>
            )}
          </ul>

          {/* 내가 작성한 여행 소개 글 목록 */}
          <h3>🌍 여행 소개</h3>
          <ul>
            {myTravels.length > 0 ? (
              myTravels.map(travel => (
                <li key={travel.id}>
                  <Link to={`/intro/${travel.id}`}>{travel.title || "제목 없음"}</Link>
                </li>
              ))
            ) : (
              <li>작성한 여행 소개 글이 없습니다.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
