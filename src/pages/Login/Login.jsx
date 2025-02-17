import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import "./style.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Store/userSlice";
import { userInfo } from "../../Store/userSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [checked, setChecked] = useState(true);
  let [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { status } = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    let user = {
      email: username,
      password: password,
      rememberMe: checked,
    };

    const result = await dispatch(loginUser(user));
    if (result.payload) {
      setUsername("");
      setPassword("");
      navigate("/profile");
    } else if (result.error) {
      setError("Internal Server Error");
    }
    dispatch(userInfo());
  };

  return (
    <>
      <Nav />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <p className="sign-in-title">Sign In</p>
          <form method="post" onSubmit={handleLogin}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {status == "401" && (
              <p className="error">Invalid username or password</p>
            )}
            {status == "500" && <p className="error">Internal Server Error</p>}
            {error && <p className="error">{error}</p>}
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Login;
