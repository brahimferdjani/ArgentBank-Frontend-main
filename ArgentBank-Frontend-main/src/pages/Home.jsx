import Banner from '../components/Banner/Banner'
import logo from '/Users/brahimfer/Downloads/ArgentBank-Frontend-main/ArgentBank-Frontend-main/src/img/argentBankLogo.png'
import './style.scss'
import Cards from '../components/Cards/Cards'
const Home = () => {
    return (
        <div>
        <nav className='header'>
      <a>
        <img
          src={logo}
          alt="Argent Bank Logo"
        />
      </a>
      <div>
        <a>
          <i className="fa fa-user-circle"></i>
          Sign In
        </a>
      </div>
    </nav>
    <Banner />
    <Cards />
    </div>
    )
}

export default Home