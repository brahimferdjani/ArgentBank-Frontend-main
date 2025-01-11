import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import "./style.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Store/postSlice";
import { userInfo } from "../../Store/getSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(checked);

  const token =
    useSelector((state) => state.post.body?.token) ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  useEffect(() => {
    if (token !== "null") {
      navigate("/profile");
    }
  }, [navigate, token]);

  if (checked) {
    localStorage.setItem("token", token);
  } else {
    sessionStorage.setItem("token", token);
  }

  const { error } = useSelector((state) => state.post);

  const handleLogin = async (e) => {
    e.preventDefault();
    let user = {
      email: username,
      password: password,
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
          <h1>Sign in</h1>
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
