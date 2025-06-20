import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/UserContext";
import "../styles/layout.css";
import TopPosts from "../TopPosts";
import TravelCarousel from "../components/Travel&Member/TravelCarousel";

export default function Home() {
  const navigate = useNavigate();
  const { user: currentUser } = useUser();

  return (
    <>
      {console.log(currentUser)}
      <div className="home-container">
        <TravelCarousel />
      </div>
      <TopPosts />
    </>
  );
}
