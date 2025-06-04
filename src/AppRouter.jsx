import { Routes, Route } from "react-router-dom";
import TravelIntro from "./pages/TravelIntro.jsx";
import DetailTravel from "./pages/DetailTravel.jsx";

// 팀 소개 관련 컴포넌트
import TeamIntro from "./pages/TeamIntro.jsx";
import CreateMember from "./pages/CreateMember.jsx";
import DetailMember from "./pages/DetailMember.jsx";

// 게시판 관련 컴포넌트
import PostBoard from "./components/Board/Board.jsx";
import PostDetail from "./components/Comment/PostDetail.jsx";
import WritePost from "./components/Comment/WritePost";

// 기타 기본 페이지
import Home from "./Home.jsx";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Login/Signup.jsx";
import CreateTravelIntro from "./pages/CreateTravelIntro.jsx";

import Layout from "./layout/layout.jsx";

export default function AppRouter({ user, setUser }) {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />

        {/* 여행 소개 관련 라우팅 */}
        <Route path="/intro" element={<TravelIntro />} />
        <Route path="/intro/new" element={<CreateTravelIntro />} />
        <Route path="/intro/:id" element={<DetailTravel />} />

        {/* 팀 소개 관련 라우팅 */}
        <Route path="/team" element={<TeamIntro />} />
        <Route path="/team/new" element={<CreateMember />} />
        <Route path="/team/:id" element={<DetailMember />} />

        {/* 게시판 관련 라우팅 */}
        <Route path="/post" element={<PostBoard />} />
        <Route path="/post/:id" element={<PostDetail currentUser={user} />} />
        <Route path="/post/write" element={<WritePost />} />
        <Route path="/edit/:id" element={<WritePost />} />
      </Routes>
    </Layout>
  );
}
