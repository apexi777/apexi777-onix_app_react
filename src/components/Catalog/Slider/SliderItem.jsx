import { Component } from 'react';
import PropTypes from 'prop-types';

import plus from '../../../assets/img/plus.png';

// const images = require('../../../assets/img/rafa-hard-court.png');

class SliderItem extends Component {
  // getImage = (url) => {
  //   try {
  //     // eslint-disable-next-line global-require, import/no-dynamic-require
  //     const response = require(url);

  //     if (!response.ok) {
  //       throw new Error(`Could not fetch ${url}, status: ${response.status}`);
  //     }
 
  //     return response;
  //   } catch {
  //     return plus;
  //   }
  // };

  render() {
    const {
      name, 
      image,
      price,
      select,
      style, 
      toggleFavorite,
      deletedCard, 
      onDragStart, 
      onDragLeave, 
      onSelectCatalog, 
      onDragEnd, 
      onDrop, 
      overId,
      id,
      onDragOver 
    } = this.props;

    return (
      <div className={style}>
        <div 
          className={`card ${(overId === id) ? 'card_over' : ''}`}
          onDragStart={onDragStart}
          onDragLeave={onDragLeave}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <img
            onError={this.onError}
            aria-hidden="true" 
            onClick={onSelectCatalog} 
            className="card_image" 
            src={image}
            alt={name} 
          />
          <img className="card_plus" src={plus} alt="add Cards" />
          <div 
            aria-hidden="true" 
            onClick={toggleFavorite}
            className={`card_favorite ${select.favorite ? 'select' : ''}`}
          />
          <div aria-hidden="true" onClick={deletedCard} className="card_deleted" />
          <p className="card_name">{name}</p>
          <div className="card_price">
            Price :
            {price}
          </div>
        </div>    
      </div>
    );
  }
}

SliderItem.propTypes = {
  onSelectCatalog: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  deletedCard: PropTypes.func.isRequired,
  name: PropTypes.string,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  style: PropTypes.string.isRequired,
  select: PropTypes.shape().isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragLeave: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  overId: PropTypes.number,
  id: PropTypes.number.isRequired,
};

SliderItem.defaultProps = {
  name: '',
  overId: null
};

export default SliderItem;
