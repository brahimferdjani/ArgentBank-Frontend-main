import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const homeTimer = () => {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    };
    homeTimer();
  }, [navigate]);

  return (
    <div>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
