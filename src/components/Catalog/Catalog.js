import { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from './Slider/Slider';

import CatalogMenu from './Form/CatalogMenu';

import './sass/Catalog.scss';

class Catalog extends Component {
  render() {
    const {
      data, updateData, onSortDataByPrice, onSelectModal, addNewCards, onSelectCatalog, toggleFavorite, deletedCard 
    } = this.props;
    
    return (
      <div className="slider">
        <div className="container">
          {data.length !== 0
            ? (
              <>
                <CatalogMenu
                  data={data}
                  onSortDataByPrice={onSortDataByPrice}
                  onSelectModal={onSelectModal}
                  addNewCards={addNewCards}
                />
                <Slider
                  updateData={updateData}
                  data={data}
                  onSelectCatalog={onSelectCatalog}
                  toggleFavorite={toggleFavorite}
                  deletedCard={deletedCard}
                />

              </>
            )
            : null}
        </div>
      </div>
    );
  }
}

Catalog.propTypes = {
  onSelectCatalog: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  deletedCard: PropTypes.func.isRequired,
  onSortDataByPrice: PropTypes.func,
  onSelectModal: PropTypes.func.isRequired,
  addNewCards: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    order: PropTypes.number,
    price: PropTypes.number,
    promo: PropTypes.string,
    select: PropTypes.shape(),
    visibleOnPromo: PropTypes.bool
  })).isRequired,
  updateData: PropTypes.func.isRequired,
};

Catalog.defaultProps = {
  onSortDataByPrice: undefined
};

export default Catalog;
