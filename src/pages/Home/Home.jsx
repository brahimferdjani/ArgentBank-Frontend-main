import Banner from "../../components/Banner/Banner";
import "./style.scss";
import Cards from "../../components/Cards/Cards";
import PropTypes from "prop-types";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <div>
      <Nav />
      <Banner />
      <div className="features">
        <Cards />
        <Cards />
        <Cards />
      </div>
      <Footer />
    </div>
  );
}

Home.propTypes = {
  logo: PropTypes.string,
};

export default Home;
