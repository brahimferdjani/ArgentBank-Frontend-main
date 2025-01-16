import Banner from "../../components/Banner/Banner";
import "./style.scss";
import Cards from "../../components/Cards/Cards";
import PropTypes from "prop-types";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import chat from "../../assets/img/icon-chat.png";
import money from "../../assets/img/icon-money.png";
import security from "../../assets/img/icon-security.png";

function Home() {
  const navigate = useNavigate();
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  useEffect(() => {
    if (token !== "null") {
      navigate("/profile");
    }
  }, [navigate, token]);

  return (
    <div>
      <Nav />
      <Banner />
      <div className="features">
        <Cards
          imageSrc={"assets/images/icon-chat.png"}
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
        <Cards
          imageSrc={"assets/images/icon-security.png"}
          title={"Accessibility"}
          description={
            "Using our state of the art technology you can access your account from anywhere."
          }
        />
      </div>
      <Footer />
    </div>
  );
}

Home.propTypes = {
  logo: PropTypes.string,
};

export default Home;
