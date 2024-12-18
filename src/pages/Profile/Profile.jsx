import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import "./style.scss";
import { useSelector } from "react-redux";

function Profile() {
  const firtName = useSelector((state) => state.user.user.firstName);
  console.log(firtName);

  return (
    <>
      <Nav />
      <main className="main bg-dark">
        <div className="title">
          <h1>
            Welcome back,
            <br />
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

export default Profile;
