import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import { Link } from "react-router-dom";
import "./style.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Store/UserSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    let user = {
      username,
      password,
    };
    dispatch(loginUser(user)).then((result) => {
      if (result.payload) {
        setUsername("");
        setPassword("");
        navigate("/User");
      }
    });
  };

  const user = useSelector((state) => state.user.user);

  return (
    <>
      <Nav />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          {user ? <p>Sign Out</p> : <p>Sign In</p>}
          <form onSubmit={handleLogin}>
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
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
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
