import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './travel.css';

export default function TravelIntro() {
  const [travelPlaces, setTravelPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/semester")
      .then(res => res.json())
      .then(data => setTravelPlaces(data));
  }, []);

  return (
    <div className="page-container">
      <h1>현지학기제 소개</h1>
      <div className="travel-grid">
        {travelPlaces.map(place => (
          <div key={place.id} className="travel-card" onClick={() => navigate(`/intro/${place.id}`)}>
            <img src={place.imageUrl} alt={place.title} />
            <h3>{place.title}</h3>
            <p>{place.description}</p>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/intro/new")} className="floating-add-button">➕ 소개 추가</button>
    </div>
  );
}
