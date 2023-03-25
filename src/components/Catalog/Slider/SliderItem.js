import { Component } from 'react';
import PropTypes from 'prop-types';

import SlideItemView from './SlideItemView';

import plus from '../../../assets/img/plus.png';
import loadingImage from '../../../assets/spinner.svg';
import errorImage from '../../../assets/error_image.png';

class SliderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
      error: false,
      loaded: false
    };
  }

  componentDidMount() {
    const { image } = this.props;
    this.setState({ src: image });
  }

  onError = () => {
    const { error } = this.state;
    if (!error) {
      this.setState({
        src: errorImage,
        error: true,
        loaded: true
      });
    }
  };

  imageOnLoaded = () => {
    this.setState(({ loaded: true }));
  };

  render() {
    const {
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
      onDragOver 
    } = this.props;

    const { src, loaded } = this.state;

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
        src={src}
        onError={this.onError}
        imageOnLoaded={this.imageOnLoaded}
      />
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
  overId: PropTypes.string,
  id: PropTypes.string.isRequired,
};

SliderItem.defaultProps = {
  name: '',
  overId: null
};

export default SliderItem;
