import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { 
  shoesUpdateAfterSelectCatalog,
  shoesDeleted,
  shoesToggleFavorite,
  activePromoUpdate
} from '../../../store/slices/shoes/slice';
import { selectorShoes } from '../../../store/slices/shoes/selectors';

import SliderItem from './SliderItem';

function SliderView({
  onPressButtonSlide, 
  count, 
  sortBlock,
  overId,  
  dragStartEvent, 
  dragEndEvent, 
  dropEvent, 
  dragOverEvent,
  updateStyleByCard
}) {
  const shoes = useSelector(selectorShoes);
  const dispatch = useDispatch();
  const copyShoes = shoes.slice();
  return (
    <div className="block_card">
      <div 
        aria-hidden="true"
        onClick={onPressButtonSlide}
        className="button button_left" 
        id="previous"
      />
      <div className="cards_menu">
        {copyShoes.sort(sortBlock).map((card, index) => {
          const {
            id, name, price, visibleOnPromo, image, select 
          } = card;
          const style = updateStyleByCard(index, count, visibleOnPromo);
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
              onDragStart={() => { dragStartEvent(card); }}
              onDragLeave={(e) => { dragEndEvent(e); }}
              onDragEnd={() => { dragEndEvent(); }}
              onDragOver={(e) => { dragOverEvent(e, card, index); }}
              onDrop={(e) => { dropEvent(e, card); }}
              onSelectCatalog={() => dispatch(shoesUpdateAfterSelectCatalog(id))}
              toggleFavorite={() => dispatch(shoesToggleFavorite(id))}
              deletedCard={() => { dispatch(shoesDeleted(id)); dispatch(activePromoUpdate()); }}
            />
          );
        })}
      </div>
      <div aria-hidden="true" onClick={onPressButtonSlide} className="button button_right" id="next" />
    </div>
  );
}

SliderView.propTypes = {
  onPressButtonSlide: PropTypes.func.isRequired,
  updateStyleByCard: PropTypes.func.isRequired,
  sortBlock: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  dragStartEvent: PropTypes.func.isRequired,
  dragEndEvent: PropTypes.func.isRequired,
  dropEvent: PropTypes.func.isRequired,
  dragOverEvent: PropTypes.func.isRequired,
  overId: PropTypes.string
};

SliderView.defaultProps = {
  overId: null
};

export default SliderView;
