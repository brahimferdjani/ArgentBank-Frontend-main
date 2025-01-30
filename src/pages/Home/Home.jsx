import Banner from "../../components/Banner/Banner";
import "./style.scss";
import Cards from "../../components/Cards/Cards";
import PropTypes from "prop-types";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import { features } from "../../data/data";

function Home() {
  return (
    <div>
      <Nav />
      <Banner />
      <div className="features-cards">
        {features.map((feature, index) => (
          <Cards
            key={index}
            imageSrc={feature.img}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

Home.propTypes = {
  logo: PropTypes.string,
};

export default Home;
