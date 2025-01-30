import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { editName } from "../../Store/userSlice";
import { userInfo } from "../../Store/userSlice";
import Transactions from "../../components/Transactions/Transactions";

function Profile() {
  const dispatch = useDispatch();
  const { body, status } = useSelector((state) => state.user);

  const loading = status === "loading";

  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("");

  async function handleEdit(e) {
    e.preventDefault();

    if (edit) {
      const editUser = {
        userName: username,
      };
      try {
        await dispatch(editName(editUser));
        dispatch(userInfo());
      } catch (error) {
        alert("Failed to update username: " + error.message);
      }
    }
    setEdit(!edit);
  }

  return (
    <>
      <Nav />
      <main className="main bg-dark">
        {loading ? (
          <div className="account">Loading profile...</div>
        ) : (
          <form method="post" className="title" onSubmit={handleEdit}>
            {edit ? (
              <div className="edit-username">
                <div>
                  <label htmlFor="username" className="account-title">
                    Username
                  </label>
                  <input
                    className="account-title"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="user-firstName" className="account-title">
                    First Name
                  </label>
                  <input
                    name="user-firstName"
                    className="account-title"
                    type="text"
                    value={body?.firstName}
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="user-lastName" className="account-title">
                    Last Name
                  </label>
                  <input
                    name="user-lastName"
                    className="account-title"
                    type="text"
                    value={body?.lastName}
                    disabled
                  />
                </div>
                <div className="edit-buttons">
                  <button
                    type="submit"
                    className="single-button"
                    onClick={(e) => {
                      e.target.blur();
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="cancel"
                    className="single-button"
                    onClick={() => {
                      setEdit(!edit);
                      setUsername("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h1>
                  Welcome back,
                  <span className="account-name">
                    {" " + body?.firstName + " " + body?.userName}
                  </span>
                </h1>
              </div>
            )}
            {!edit && (
              <button type="submit" className="edit-button">
                Edit Name
              </button>
            )}
          </form>
        )}
        <Transactions />
      </main>
      <Footer />
    </>
  );
}

export default Profile;
