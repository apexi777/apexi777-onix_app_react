// Підключення бібліотек
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function SlideItemView({
  name,
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
  onDragOver,
  plus,
  loadingImage,
  src,
  loaded,
  onError,
  imageOnLoaded
}) {
  const { t } = useTranslation();
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
          onError={onError}
          onLoad={imageOnLoaded}
          aria-hidden="true" 
          onClick={onSelectCatalog} 
          className="card_image" 
          src={loaded ? src : loadingImage}
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
          {t('catalog.slider.price')}
          {price}
          $
        </div>
      </div>    
    </div>
  );
}

SlideItemView.propTypes = {
  onSelectCatalog: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  deletedCard: PropTypes.func.isRequired,
  name: PropTypes.string,
  plus: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  style: PropTypes.string.isRequired,
  select: PropTypes.shape({
    favorite: PropTypes.bool
  }).isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragLeave: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  overId: PropTypes.string,
  id: PropTypes.string.isRequired,
  loadingImage: PropTypes.string.isRequired,
  imageOnLoaded: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  loaded: PropTypes.bool.isRequired,
};

SlideItemView.defaultProps = {
  name: '',
  overId: null
};

export default SlideItemView;
