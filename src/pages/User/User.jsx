import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import "./style.scss";
import { useState } from "react";
function User() {
  function getUser() {
    let user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    } else {
      user = null;
    }
    return user;
  }

  const { user } = useState(getUser());

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      <Nav>
        <Link to="/" className="header-nav">
          <i className="fa fa-sign-out"></i>
          <button onClick={logout}>Sign Out</button>
        </Link>
      </Nav>
      <main className="main bg-dark">
        <div className="title">
          <h1>
            Welcome back
            <br />
            {user ? user.firstName : ""}
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default User;
