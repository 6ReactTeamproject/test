// src/AppRouter.jsx
import { Routes, Route } from "react-router-dom";
import TravelIntro from "./components/Travel/TravelIntro";
import CreateTravelIntro from "./components/Travel/CreateTravelIntro";
import DetailTravel from "./components/Travel/DetailTravel";
import PostBoard from "./components/Board/Board.jsx";
import Login from "./components/Login/Login.jsx";
import Home from "./Home.jsx";
import PostDetail from "./components/Comment/PostDetail";
import Signup from "./components/Login/Signup.jsx";
import WritePost from "./components/Comment/WritePost.jsx";

export default function AppRouter({ setUser }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/intro" element={<TravelIntro />} />
      <Route path="/intro/new" element={<CreateTravelIntro />} />
      <Route path="/intro/:id" element={<DetailTravel />} />
      <Route path="/board" element={<PostBoard />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="/write" element={<WritePost />} />
      <Route path="/edit/:id" element={<WritePost />} />
    </Routes>
  );
}
