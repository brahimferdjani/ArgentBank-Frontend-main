import { Link } from "react-router-dom";
import Logo from "../../assets/img/argentBankLogo.png";
import "./style.scss";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../Store/userSlice";
import { useDispatch } from "react-redux";

function Nav() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/login");
  }

  const { body } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function navHome() {
    navigate("/profile");
  }

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  const isLogged =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  return (
    <nav className="header">
      <Link to="/">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
      </Link>
      <div className="flex-box">
        {isLogged ? (
          <div className="header-nav">
            <div className="user-nav" onClick={navHome}>
              <i className="fa fa-user-circle"></i>
              <p>{body?.userName}</p>
            </div>
            <div className="user-nav" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <p>Sign Out</p>
            </div>
          </div>
        ) : (
          <div className="user-nav" onClick={handleClick}>
            <i className="fa fa-user-circle"></i>
            <p>Sign In</p>
          </div>
        )}
      </div>
    </nav>
  );
}

Nav.propTypes = {
  children: PropTypes.node,
};

export default Nav;
