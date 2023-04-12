import { Component } from 'react';
import PropTypes from 'prop-types';

import { CLICK_NEXT_BUTTON, CLICK_PREVIOUS_BUTTON } from '../../../constans/translates';
import SliderView from './SliderView';

import '../sass/Slider.scss';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overId: null,
      currentBlock: null,
      count: 0
    };
  }

  dragStartEvent = (e, block) => {
    this.setState(({ currentBlock: block }));
  };

  dragEndEvent = () => {
    this.setState(({ overId: null }));
  };

  dragOverEvent = (e, block) => {
    e.preventDefault();
    this.setState(({ overId: block.id }));
  };

  dropEvent = (e, block) => {
    const { currentBlock } = this.state;
    const { updateData } = this.props;
    this.setState(({ overId: null }));
    e.preventDefault();
    updateData(currentBlock, block);
  };

  sortBlock = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } 
    return -1;
  };

  onPressButtonSlide = (e, SomData) => {
    const { id } = e.target;
    switch (id) {
      case CLICK_PREVIOUS_BUTTON:
        this.setState(({ count }) => ({ count: Math.max(count - 1, 0) }));
        break;
      case CLICK_NEXT_BUTTON: 
        this.setState(({ count }) => ({ count: Math.min(count + 1, SomData.length - 1) }));
        break; 
      default: break;
    }
  };

  render() {
    const { count, overId } = this.state;
    const {
      onSelectCatalog, toggleFavorite, deletedCard, data 
    } = this.props;
    return (
      <SliderView
        onPressButtonSlide={(e) => this.onPressButtonSlide(e, data)}
        data={data}
        sortBlock={this.sortBlock} 
        count={count} 
        overId={overId} 
        onSelectCatalog={onSelectCatalog} 
        toggleFavorite={toggleFavorite} 
        deletedCard={deletedCard}  
        dragStartEvent={this.dragStartEvent} 
        dragEndEvent={this.dragEndEvent} 
        dropEvent={this.dropEvent} 
        dragOverEvent={this.dragOverEvent}
      />
    );
  }
}

Slider.propTypes = {
  onSelectCatalog: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
  deletedCard: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Slider;
