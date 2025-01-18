import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import "./style.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Store/postSlice";
import { userInfo } from "../../Store/getSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error } = useSelector((state) => state.post);

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
    }
    dispatch(userInfo());
  };

  return (
    <>
      <Nav />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <form onSubmit={handleLogin}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              {checked ? (
                <input
                  type="text"
                  id="username"
                  placeholder={username}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              )}
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
            {error && <p>{error}</p>}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Login;
