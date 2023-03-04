import { Component } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import CatalogItem from './CatalogItem';
import CatalogMenu from './CatalogMenu';

import './sass/Catalog.scss';

class Catalog extends Component {
  // Slider elements
  elements = (data) => {
    const { onSelectCatalog, toggleFavorite, deletedCard } = this.props;
    return data.map((item) => {
      const {
        id, name, price, visibleOnPromo, image, select 
      } = item;
      return (
        <CatalogItem 
          key={id}
          name={name}
          price={price}
          visibleOnPromo={visibleOnPromo}
          image={image}
          select={select}
          onSelectCatalog={() => onSelectCatalog(id)}
          toggleFavorite={() => toggleFavorite(id)}
          deletedCard={() => { deletedCard(id); }}
        />
      );
    });
  };

  // Sets value to show items slider if media screen max-width 575px
  setSlidesToShow = (data) => {
    if (window.matchMedia('(max-width: 575px)').matches) {
      return 2;
    } if (data.length > 0 && data.length <= 3) return data.length;
    return 3;
  };

  render() {
    const {
      data, onSortDataByPrice, onSelectModal, addNewCards 
    } = this.props;
    
    // Settings by Slick Slider library
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: this.setSlidesToShow(data),
      slidesToScroll: 1,
      initialSlide: 1,
    };
    return (
      <div className="slider">
        <div className="container">
          <CatalogMenu 
            data={data} 
            onSortDataByPrice={onSortDataByPrice} 
            onSelectModal={onSelectModal} 
            addNewCards={addNewCards}
          />
          <div className="slider_menu">
            <Slider 
              dots={settings.dots}
              infinite={settings.infinite}
              speed={settings.speed}
              slidesToShow={settings.slidesToShow}
              slidesToScroll={settings.slidesToScroll}
              initialSlide={settings.initialSlide} 
              focusOnSelect={settings.focusOnSelect}
            >
              {this.elements(data)}
            </Slider>
          </div>
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
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

Catalog.defaultProps = {
  onSortDataByPrice: undefined
};

export default Catalog;
