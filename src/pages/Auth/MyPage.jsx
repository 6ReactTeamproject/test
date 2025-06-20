import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/UserContext";
import UploadImg from "./UploadImg";
import GitForm from "./GitForm";
import MypageLayout from "./MypageLayout";
import { Link } from "react-router-dom";

export default function MyPage() {
  const { user } = useUser();
  const [myPosts, setMyPosts] = useState([]);
  const [myMembers, setMyMembers] = useState([]);
  const [myTravels, setMyTravels] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch("http://localhost:3001/posts")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(item => String(item.userId) === String(user.id));
        setMyPosts(filtered);
      });

    fetch("http://localhost:3001/members")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(item => String(item.authorId) === String(user.id));
        setMyMembers(filtered);
      });

    fetch("http://localhost:3001/semester")
      .then(res => res.json())
      .then(data => {
        const filtered = Array.isArray(data)
          ? data.filter(item => String(item.authorId) === String(user.id))
          : [];
        setMyTravels(filtered);
      });
  }, [user]);

  if (!user) return <p>로그인이 필요합니다.</p>;

  return (
    <MypageLayout>
      <h2>마이페이지</h2>
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
    </MypageLayout>
  );
}
