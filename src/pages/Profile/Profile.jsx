import { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { editName } from "../../Store/editSlice";
import { userInfo } from "../../Store/getSlice";
import { useRef } from "react";
function Profile() {
  const dispatch = useDispatch();
  const { body, status } = useSelector((state) => state.get);

  const loading = status === "loading";

  useEffect(() => {
    if (status === "idle") {
      dispatch(userInfo());
    }
  }, [dispatch, status]);

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
        dispatch(userInfo());
      } catch (error) {
        alert("Failed to update username: " + error.message);
      }
    }
    // Toggle the edit mode
    setEdit(!edit);
  }

  const inputRef = useRef(null);

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
                  ref={inputRef}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />{" "}
                <button
                  type="submit"
                  className="edit-button"
                  onClick={() => {
                    inputRef.current.focus();
                  }}
                >
                  {edit ? "Save" : "Edit Name"}
                </button>
              </div>
            ) : (
              <h1>
                Welcome back, {body?.firstName} {body?.lastName}{" "}
                {body?.userName}
              </h1>
            )}
            {!edit && (
              <button type="submit" className="edit-button">
                Edit Name
              </button>
            )}
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
