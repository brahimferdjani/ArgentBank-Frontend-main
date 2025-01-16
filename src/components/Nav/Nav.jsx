import { Link } from "react-router-dom";
import Logo from "../../assets/img/argentBankLogo.png";
import "./style.scss";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../Store/postSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function Nav() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/login");
  }

  const { body } = useSelector((state) => state.get);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  const isLogged = useSelector((state) => state.post.status === 200);

  return (
    <nav className="header">
      <Link to="/">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
      </Link>
      <div>
        {isLogged !== "null" ? (
          <div className="flex-box">
            <div className="header-nav">
              <i className="fa fa-user-circle"></i>
              {" " + body?.userName}
            </div>
            <div onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket">
                <span className="header-nav"> Sign Out</span>
              </i>
            </div>
          </div>
        ) : (
          <div onClick={handleClick}>
            <i className="fa fa-user-circle"></i>
            <span className="header-nav"> Sign In</span>
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
