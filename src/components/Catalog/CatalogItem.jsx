import { Component } from 'react';
import PropTypes from 'prop-types';

import CatalogItemView from './CatalogItemView';

class CatalogItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: 'slider_menu_item',
      chosenFavorite: 'slider_menu_item_favorite'
    };
  }

  // Initial check for favorite property and element activity property
  componentDidMount() {
    const { visibleOnPromo, select } = this.props;
    if (visibleOnPromo) {
      this.setState(({ classes: 'slider_menu_item activity' }));
    } else if (select.favorite) {
      this.setState(({ chosenFavorite: 'slider_menu_item_favorite select' }));
    }
  }

  // Checking for property activity on an element after re-rendering
  componentDidUpdate(prevProps) {
    const { visibleOnPromo, select } = this.props;
    if (visibleOnPromo !== prevProps.visibleOnPromo) {
      if (visibleOnPromo) {
        this.setState(({ classes: 'slider_menu_item activity' }));
      } else {
        this.setState(({ classes: 'slider_menu_item' }));
      }
    } else if (select !== prevProps.select) {
      if (select.favorite) {
        this.setState(({ chosenFavorite: 'slider_menu_item_favorite select' }));
      } else {
        this.setState(({ chosenFavorite: 'slider_menu_item_favorite' }));
      }
    }
  }

  render() {
    const {
      name, price, image, onSelectCatalog, toggleFavorite, deletedCard 
    } = this.props; 
  
    const { classes, chosenFavorite } = this.state;

    return (
      <CatalogItemView 
        name={name}
        price={price}
        image={image}
        onSelectCatalog={onSelectCatalog}
        toggleFavorite={toggleFavorite}
        deletedCard={deletedCard}
        classes={classes}
        chosenFavorite={chosenFavorite}
      />
    );
  }
}

CatalogItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  visibleOnPromo: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  select: PropTypes.shape().isRequired,
  onSelectCatalog: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  deletedCard: PropTypes.func.isRequired
};

export default CatalogItem;
