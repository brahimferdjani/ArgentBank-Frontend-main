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
        <Cards
          imageSrc={"assets/images/icon-features.png"}
          title={"Features"}
          description={
            "Our aim is to make it quick and easy for you to access your account anywhere, on any device."
          }
        />
        <Cards
          imageSrc={"assets/images/icon-money.png"}
          title={"Security"}
          description={
            "We use top of the range encryption to ensure your data and money is always safe."
          }
        />
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
