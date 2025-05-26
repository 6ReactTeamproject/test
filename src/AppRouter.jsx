// AppRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import TravelIntro from "./components/Travel/TravelIntro";
import CreateTravelIntro from "./components/Travel/CreateTravelIntro";
import DetailTravel from "./components/Travel/DetailTravel";
import TeamIntro from "./components/Member/TeamIntro";
import PostBoard from "./pages/Board.jsx";
import Login from "./components/Login/Login.jsx";
import Home from "./Home.jsx";
import PostDetail from "./pages/PostDetail";
import Signup from "./components/Login/Signup.jsx"; 
import MemberDetail from "./components/Member/MemberDetail.jsx";
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
      <Route path="/board" element={<PostBoard />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="/posts/:id" element={<MemberDetail />} />
    </Routes>
  );
}
