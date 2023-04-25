import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <div className="content">
        <h2 className="content__title">404</h2>
        <p className="content__text">Страница не найдена</p>
      </div>
      <p onClick={() => navigate(-1)} className="content__link">
        Назад
      </p>
    </>
  );
}

export default NotFound;
