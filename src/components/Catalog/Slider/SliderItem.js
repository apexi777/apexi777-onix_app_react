// Підключення бібліотек
import { useState } from 'react';
import PropTypes from 'prop-types';

// Імпорт компонентт
import SlideItemView from './SlideItemView';

// Імпорт контенту
import plus from '../../../assets/img/plus.png';
import loadingImage from '../../../assets/spinner.svg';
import errorImage from '../../../assets/error_image.png';

function SliderItem({
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
  image,
  id,
  onDragOver 
}) {
  // Стейт помилки та завантаження слайду
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Функція обробки помилки
  const onError = () => {
    if (!error) {
      setError(true);
      setLoaded(true);
    }
  };

  // Функція обробки завантаження
  const imageOnLoaded = () => {
    setLoaded(true);
  };

  return (
    <SlideItemView 
      name={name}
      price={price}
      select={select}
      style={style}
      toggleFavorite={toggleFavorite}
      deletedCard={deletedCard}
      onDragStart={onDragStart}
      onDragLeave={onDragLeave}
      onSelectCatalog={onSelectCatalog}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      overId={overId}
      id={id}
      onDragOver={onDragOver}
      loaded={loaded}
      loadingImage={loadingImage}
      plus={plus}
      src={error ? errorImage : image}
      onError={onError}
      imageOnLoaded={imageOnLoaded}
    />
  );
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
  overId: PropTypes.string,
  id: PropTypes.string.isRequired,
};

SliderItem.defaultProps = {
  name: '',
  overId: null
};

export default SliderItem;
