import { useNavigate } from "react-router-dom";
import "./travel.css";
import { useUser } from "./UserContext";
import { useEffect, useState } from "react";
import { apiGet } from "../../api/fetch";

export default function IntroList({
  heading,
  endpoint,
  primaryKey,
  secondaryKey,
  imageKey,
  pathPrefix
}) {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    apiGet(endpoint)
      .then(data => setItems(data))
      .catch(err => console.error("데이터 불러오기 실패:", err));
  }, [endpoint]);

  const handleAddClick = () => {
    if (!user) {
      alert("로그인이 필요한 기능입니다.");
      navigate("/login");
    } else {
      navigate(`/${pathPrefix}/new`);
    }
  };

  return (
    <div className="page-container">
      <h1>{heading}</h1>
      <div className="travel-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className="travel-card"
            onClick={() => navigate(`/${pathPrefix}/${item.id}`)}
          >
            <img src={item[imageKey]} alt={item[primaryKey]} />
            <h3>{item[primaryKey]}</h3>
            <p>{item[secondaryKey]}</p>
          </div>
        ))}
      </div>
      <button
        onClick={handleAddClick}
        className="floating-add-button"
      >
        ➕ 추가
      </button>
    </div>
  );
}
