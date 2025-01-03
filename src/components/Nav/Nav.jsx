import { Link } from "react-router-dom";
import Logo from "../../assets/img/argentBankLogo.png";
import "./style.scss";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <nav className="header">
      <Link to="/">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
      </Link>
      {localStorage.getItem("token") ? (
        <div>
          <button type="button" onClick={handleLogout}>
            <i className="fa fa-user-circle"></i>{" "}
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login" className="header-nav">
            <i className="fa fa-user-circle"></i>
          </Link>
        </div>
      )}
    </nav>
  );
}

Nav.propTypes = {
  children: PropTypes.node,
};

export default Nav;
