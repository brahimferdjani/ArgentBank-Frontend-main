import { Link } from "react-router-dom";
import Logo from "../../assets/img/argentBankLogo.png";
import "./style.scss";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../Store/postSlice";
import { useDispatch } from "react-redux";

function Nav() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/login");
  }

  const { body } = useSelector((state) => state.get);
  const dispatch = useDispatch();

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
          <div>
            <div className="header-nav">
              <Link to="/profile">
                <i className="fa fa-user-circle"></i>
                {" " + body?.userName}
              </Link>
            </div>
            <div className="header-nav" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <p>Sign Out</p>
            </div>
          </div>
        ) : (
          <div className="header-nav" onClick={handleClick}>
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
