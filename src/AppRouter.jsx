import { Routes, Route } from "react-router-dom";
import TravelIntro from "./pages/Travel/TravelIntro.jsx";
import TeamIntro from "./pages/Member/TeamIntro.jsx";
import CreateMember from "./pages/Member/CreateMember.jsx";
import DetailMember from "./pages/Member/DetailMember.jsx";
import PostBoard from "./components/Board/Board.jsx";
import PostDetail from "./components/Post/PostDetail.jsx";
import WritePost from "./components/Post/WritePost";
import DetailTravel from "./pages/Travel/DetailTravel.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import MyPage from "./pages/Auth/MyPage.jsx";
import CreateTravelIntro from "./pages/Travel/CreateTravelIntro.jsx";
import Layout from "./layout/Layout.jsx";
import MessageBox from "./components/Message/MessageBox.jsx";
import ChangePasswordForm from "./pages/Auth/ChangePasswordForm.jsx";
import ChangeNameForm from "./pages/Auth/ChangeNameForm.jsx";

export default function AppRouter({ user, setUser }) {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />

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

        {/* 마이페이지 관련 라우팅 */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/message" element={<MessageBox />} />
        <Route path="/mypage/password" element={<ChangePasswordForm />} />
        <Route path="/mypage/nickname" element={<ChangeNameForm />} />
      </Routes>
    </Layout>
  );
}
