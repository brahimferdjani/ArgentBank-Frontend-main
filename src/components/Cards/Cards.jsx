import "./style.scss";
import PropTypes from "prop-types";
function Cards({ imageSrc, title, description }) {
  return (
    <div className="features">
      <div className="feature-item">
        <img src={imageSrc} alt="Credit Card" className="feature-icon" />
        <h2 className="feature-item-title">{title}</h2>
        {description}
      </div>
    </div>
  );
}

Cards.propTypes = {
  imageSrc: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Cards;
