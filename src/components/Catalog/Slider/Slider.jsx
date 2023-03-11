import { Component } from 'react';
import PropTypes from 'prop-types';

import SliderView from './SliderView';
import SliderItem from './SliderItem';

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

  dragEndEvent = (e) => {
    if (e.target.className === 'card card_over' && e.target.className !== 'card_image') {
      this.setState(({ overId: null }));
    } else if (e.target.className === 'card_image') {
      this.setState(({ overId: null }));
    }
  };

  dragOverEvent = (e, block) => {
    const { currentBlock } = this.state;
    e.preventDefault();
    if (e.target.className === 'card' && currentBlock.id !== block.id && e.target.className !== 'card_image') {
      this.setState(({ overId: block.id }));
    } else if (e.target.className === 'card_image' && currentBlock.id !== block.id) {
      this.setState(({ overId: block.id }));
    }
  };

  dropEvent = (e, block) => {
    const { currentBlock } = this.state;
    const { updateData } = this.props;
    e.preventDefault();
    if (e.target.className === 'card card_over' && e.target.className !== 'card_image') {
      this.setState(({ overId: null }));
    } else if (e.target.className === 'card_image' || e.target.className === 'card_plus') {
      this.setState(({ overId: null }));
    }
    updateData(currentBlock, block);
  };

  sortBlock = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } 
    return -1;
  };

  onPressButtonSlide = (e, data) => {
    const { count } = this.state;
    const { id } = e.target;
    switch (id) {
      case 'previous':
        if (count === 0) break;
        else this.setState(({ count: count - 1 }));
        break;
      case 'next': 
        if (count === data.length - 1) break; 
        else this.setState(({ count: count + 1 }));
        break; 
      default: break;
    }
  };

  render() {
    const { count, overId } = this.state;
    const {
      onSelectCatalog, toggleFavorite, deletedCard, data 
    } = this.props;
    const slideElements = data.sort(this.sortBlock).map((card, index) => {
      const {
        id, name, price, visibleOnPromo, image, select 
      } = card;
      let style;
      if (index === count) style = 'slide slide_active';
      else if (index === count + 1) style = 'slide slide_active2';
      else if (index === count + 2) style = 'slide slide_active3';
      else if (index > count && index !== count + 1 && index !== count + 2) style = 'slide slide_next';
      else if (index < count) style = 'slide slide_prev';
      if (visibleOnPromo) {
        style += ' choice';
      }
      return (
        <SliderItem 
          key={id}
          id={id}
          name={name}
          image={image}
          price={price}
          style={style}
          overId={overId}
          select={select}
          draggable
          onDragStart={(e) => { this.dragStartEvent(e, card); }}
          onDragLeave={(e) => { this.dragEndEvent(e); }}
          onDragEnd={(e) => { this.dragEndEvent(e); }}
          onDragOver={(e) => { this.dragOverEvent(e, card, index); }}
          onDrop={(e) => { this.dropEvent(e, card); }}
          onSelectCatalog={() => onSelectCatalog(id)}
          toggleFavorite={() => toggleFavorite(id)}
          deletedCard={() => { deletedCard(id); }}
        />
      );
    });
    return (
      <SliderView
        onPressButtonSlide={(e) => this.onPressButtonSlide(e, data)}
        data={data}
        slideElements={slideElements}  
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
