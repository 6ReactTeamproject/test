import { useNavigate } from "react-router-dom";
import { useRouteHistory } from "../../hooks/useRouteHistory";
import "./BackButton.css";

const BackButton = ({ variant = "default" }) => {
  const navigate = useNavigate();
  const { customHistory } = useRouteHistory();

  const handleBack = () => {
    if (customHistory.current.index > 0) {
      customHistory.current.index--;
      const target = customHistory.current.entries[customHistory.current.index];
      navigate(target);
    } else {
      navigate(-1);
    }
  };

  return (
    <button className={`back-button ${variant}`} onClick={handleBack}>
      <span className="back-icon">←</span>
      <span className="back-text">이전</span>
    </button>
  );
};

export default BackButton;
