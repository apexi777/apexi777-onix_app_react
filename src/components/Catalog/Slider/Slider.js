import { useState } from 'react';
import PropTypes from 'prop-types';

import { CLICK_NEXT_BUTTON, CLICK_PREVIOUS_BUTTON } from '../../../constans/translates';
import SliderView from './SliderView';

import '../sass/Slider.scss';

function Slider({
  onSelectCatalog, toggleFavorite, deletedCard, data, updateData 
}) {
  const [overId, setOverId] = useState(null);
  const [currentBlock, setCurrentBlock] = useState(null);
  const [count, setCount] = useState(0);

  const dragStartEvent = (block) => {
    setCurrentBlock(block);
  };

  const dragEndEvent = () => {
    setOverId(null);
  };

  const dragOverEvent = (e, block) => {
    e.preventDefault();
    setOverId(block.id);
  };

  const dropEvent = (e, block) => {
    setOverId(null);
    e.preventDefault();
    updateData(currentBlock, block);
  };

  const sortBlock = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } 
    return -1;
  };

  const onPressButtonSlide = (e, somData) => {
    const { id } = e.target;
    switch (id) {
      case CLICK_PREVIOUS_BUTTON:
        setCount(({ prevCount }) => Math.max(prevCount - 1, 0));
        break;
      case CLICK_NEXT_BUTTON: 
        setCount(({ prevCount }) => Math.min(prevCount + 1, somData.length - 1));
        break; 
      default: break;
    }
  };

  return (
    <SliderView
      onPressButtonSlide={(e) => onPressButtonSlide(e, data)}
      data={data}
      sortBlock={sortBlock} 
      count={count} 
      overId={overId} 
      onSelectCatalog={onSelectCatalog} 
      toggleFavorite={toggleFavorite} 
      deletedCard={deletedCard}  
      dragStartEvent={dragStartEvent} 
      dragEndEvent={dragEndEvent} 
      dropEvent={dropEvent} 
      dragOverEvent={dragOverEvent}
    />
  );
}

Slider.propTypes = {
  onSelectCatalog: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
  deletedCard: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Slider;
