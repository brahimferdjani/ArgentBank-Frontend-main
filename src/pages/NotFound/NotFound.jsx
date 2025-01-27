import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import "./style.scss";

const NotFound = ({ initialSeconds = 3 }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const navigate = useNavigate();

  useEffect(() => {
    if (secondsLeft > 0) {
      const timeout = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 3000);
      return () => clearTimeout(timeout);
    } else if (secondsLeft === 0) {
      navigate("/");
    }
  }, [secondsLeft, navigate]);

  return (
    <div>
      <Nav />
      <div className="not-found">
        <h1>404 Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <p>returning to home page in {secondsLeft} seconds... </p>
      </div>
      <Footer />
    </div>
  );
};

NotFound.propTypes = {
  initialSeconds: PropTypes.number,
};
export default NotFound;
