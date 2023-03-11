import { Component } from 'react';
import PropTypes from 'prop-types';

class SliderView extends Component {
  render() {
    const { onPressButtonSlide, slideElements } = this.props;
    return (
      <div className="block_card">
        <div 
          aria-hidden="true"
          onClick={onPressButtonSlide}
          className="button button_left" 
          id="previous"
        />
        <div className="cards_menu">
          {slideElements}
        </div>
        <div aria-hidden="true" onClick={onPressButtonSlide} className="button button_right" id="next" />
      </div>
    );
  }
}

SliderView.propTypes = {
  onPressButtonSlide: PropTypes.func.isRequired,
  slideElements: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default SliderView;
