import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import { editName, selectLoading, selectUser } from "../../Store/UserSlice";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Store/UserSlice";
function Profile() {
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const user = useSelector(selectUser);
  console.log(user);

  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("");

  async function handleEdit(e) {
    e.preventDefault();

    if (edit) {
      // Submit the edit to the backend
      const editUser = {
        userName: username,
      };
      try {
        await dispatch(editName(editUser));
        alert("Username updated successfully!");
      } catch (error) {
        alert("Failed to update username: " + error.message);
      }
    }
    // Toggle the edit mode
    setEdit(!edit);
  }

  return (
    <>
      <Nav />
      <main className="main bg-dark">
        {loading ? (
          <div className="account">Loading profile...</div>
        ) : (
          <form className="title" onSubmit={handleEdit}>
            {edit ? (
              <div>
                <input
                  className="account-title"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />{" "}
              </div>
            ) : (
              <h1>Welcome back, {username}</h1>
            )}
            <button type="submit" className="edit-button">
              {edit ? "Save" : "Edit Name"}
            </button>
          </form>
        )}
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
