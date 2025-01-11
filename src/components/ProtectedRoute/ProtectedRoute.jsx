import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const token =
    useSelector((state) => state.post.body?.token) ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  console.log(token);

  return token !== "null" ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
