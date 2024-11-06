import { Link } from "react-router-dom";
import Logo from "../../assets/img/argentBankLogo.png";
import "./style.scss";
import PropTypes from "prop-types";

function Nav({ children }) {
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
        <Link to="/login" className="header-nav">
          <i className="fa fa-user-circle"></i>
          &nbsp;Sign In&nbsp;
        </Link>
        {children}
      </div>
    </nav>
  );
}

Nav.propTypes = {
  children: PropTypes.node,
};

export default Nav;
