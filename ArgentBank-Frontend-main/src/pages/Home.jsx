import logo from '../img/argentBankLogo.png'
const Home = () => {
    return (
        <nav >
      <a>
        <img
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1>Argent Bank</h1>
      </a>
      <div>
        <a href="./sign-in.html">
          <i className="fa fa-user-circle"></i>
          Sign In
        </a>
      </div>
    </nav>
    )
}

export default Home