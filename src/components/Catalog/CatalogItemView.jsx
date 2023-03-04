import { Component } from 'react';
import PropTypes from 'prop-types';

class CatalogItemView extends Component {
  render() {
    const {
      name, price, image, onSelectCatalog, toggleFavorite, deletedCard, classes, chosenFavorite 
    } = this.props; 
    return (
      <div className="slider_block">
        <div aria-hidden="true" onClick={onSelectCatalog} className={classes}>
          <img src={image} alt={name} />
        </div>
        <div aria-hidden="true" onClick={toggleFavorite} className={chosenFavorite} />
        <div aria-hidden="true" onClick={deletedCard} className="slider_menu_item_deleted" />
        <p className="slider_menu_name">{name}</p>
        <div className="slider_menu_price">
          Price :
          {price}
        </div>
      </div>
    );
  }
}

CatalogItemView.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  classes: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  chosenFavorite: PropTypes.string.isRequired,
  onSelectCatalog: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  deletedCard: PropTypes.func.isRequired
};

export default CatalogItemView;
