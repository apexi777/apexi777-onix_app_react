import PropTypes from 'prop-types';

// import { 
//   SLIDE_ACTIVE_CENTER,
//   SLIDE_ACTIVE_LEFT,
//   SLIDE_ACTIVE_RIGHT,
//   SLIDE_NOACTIVE_LEFT,
//   SLIDE_NOACTIVE_RIGHT,
//   SLIDE_CHOICE
// } from '../../../constans/translates';

import SliderItem from './SliderItem';

function SliderView({
  onPressButtonSlide, 
  data, 
  count, 
  sortBlock,
  overId, 
  onSelectCatalog, 
  toggleFavorite, 
  deletedCard,
  dragStartEvent, 
  dragEndEvent, 
  dropEvent, 
  dragOverEvent,
  updateStyleByCard
}) {
  return (
    <div className="block_card">
      <div 
        aria-hidden="true"
        onClick={onPressButtonSlide}
        className="button button_left" 
        id="previous"
      />
      <div className="cards_menu">
        {data.sort(sortBlock).map((card, index) => {
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
              onSelectCatalog={() => onSelectCatalog(id)}
              toggleFavorite={() => toggleFavorite(id)}
              deletedCard={() => { deletedCard(id); }}
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
  onSelectCatalog: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  deletedCard: PropTypes.func.isRequired,
  sortBlock: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  dragStartEvent: PropTypes.func.isRequired,
  dragEndEvent: PropTypes.func.isRequired,
  dropEvent: PropTypes.func.isRequired,
  dragOverEvent: PropTypes.func.isRequired,
  overId: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    order: PropTypes.number,
    price: PropTypes.number,
    promo: PropTypes.string,
    select: PropTypes.shape(),
    visibleOnPromo: PropTypes.bool
  })).isRequired,
};

SliderView.defaultProps = {
  overId: null
};

export default SliderView;
