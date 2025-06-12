import { useNavigate } from "react-router-dom";
import "../../styles/travel.css";
import HandleAuth from "./HandleAuth";
import { useUser } from "../../hooks/UserContext";
import { useEffect, useState } from "react";
import { apiGet } from "../../api/fetch";

export default function IntroList({
  heading,
  endpoint,
  primaryKey,
  secondaryKey,
  imageKey,
  pathPrefix,
}) {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser();

  const DEFAULT_PROFILE = "https://placehold.co/48x48?text=No+Img&font=roboto";

  useEffect(() => {
    apiGet(endpoint)
      .then((data) => setItems(data))
      .catch((err) => console.error("데이터 불러오기 실패:", err));
  }, [endpoint]);

  return (
    <div
      className={`page-container ${
        pathPrefix === "intro" ? "travel-intro" : "member-intro"
      }`}
    >
      <div className="intro-header">
        <h1>{heading}</h1>
      </div>
      <div className="travel-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className="travel-card"
            onClick={() => navigate(`/${pathPrefix}/${item.id}`)}
          >
            <img
              src={item[imageKey] ? item[imageKey] : DEFAULT_PROFILE}
              alt={item[primaryKey]}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = DEFAULT_PROFILE;
              }}
            />
            <h3>{item[primaryKey]}</h3>
            <p>{item[secondaryKey]}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => HandleAuth(user, navigate, `/${pathPrefix}/new`)}
        className="floating-add-button"
      >
        ➕ 추가
      </button>
    </div>
  );
}
