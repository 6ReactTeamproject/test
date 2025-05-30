// AppRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import TravelIntro from "./components/Travel/TravelIntro";
import CreateTravelIntro from "./components/Travel/CreateTravelIntro";
import DetailTravel from "./components/Travel/DetailTravel";
import TeamIntro from "./components/Member/TeamIntro";
import CreateMember from "./components/Member/CreateMember";
import ReadMember from "./components/Member/ReadMember";
import PostBoard from "./components/Board/Board.jsx";
import Login from "./components/Login/Login.jsx";
import Home from "./Home.jsx";
import PostDetail from "./components/Comment/PostDetail";
import Signup from "./components/Login/Signup.jsx";
// import WritePost
import WritePost from "./components/Comment/WritePost.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> {/* ✅ 추가 */}
      <Route path="/intro" element={<TravelIntro />} />
      <Route path="/intro/new" element={<CreateTravelIntro />} />
      <Route path="/intro/:id" element={<DetailTravel />} />
      <Route path="/team" element={<TeamIntro />} />
      <Route path="/team/new" element={<CreateMember/>} />
      <Route path="/team/:id" element={<ReadMember />} />
      <Route path="/board" element={<PostBoard />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="/write" element={<WritePost />} />
      <Route path="/edit/:id" element={<WritePost />} />
    </Routes>
  );
}
