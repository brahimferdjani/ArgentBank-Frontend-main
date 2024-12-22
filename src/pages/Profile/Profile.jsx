import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import "./style.scss";
import { useState } from "react";
import { getUserUsername, loginUser3 } from "../../Store/UserSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Profile() {
  localStorage.getItem("token");
  const { edit, setEdit } = useState(false);
  const { username } = useState(useSelector(getUserUsername));
  const dispatch = useState(useDispatch());
  useEffect(() => {
    dispatch(loginUser3(username));
  });

  function handleEdit() {
    setEdit(!edit);
  }

  return (
    <>
      <Nav />
      <main className="main bg-dark">
        <form className="title" onSubmit={handleEdit}>
          {edit ? (
            <input className="input" type="text" />
          ) : (
            <h1>Welcome back, {username}</h1>
          )}
          <button type="submit" className="edit-button">
            Edit Name
          </button>
        </form>
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

export default Profile;
