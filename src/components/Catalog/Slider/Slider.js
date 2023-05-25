// Підключення бібліотек
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Імпорт стору
import { shoesUpdateAfterDrag } from '../../../store/slices/shoes/slice';
import { selectorShoes } from '../../../store/slices/shoes/selectors';

// Імпорт компонент
import SliderView from './SliderView';

// Імпорт констант
import { 
  CLICK_NEXT_BUTTON, 
  CLICK_PREVIOUS_BUTTON,
  SLIDE_ACTIVE_CENTER,
  SLIDE_ACTIVE_LEFT,
  SLIDE_ACTIVE_RIGHT,
  SLIDE_NOACTIVE_LEFT,
  SLIDE_NOACTIVE_RIGHT,
  SLIDE_CHOICE
} from '../../../constans/translates';

import '../sass/Slider.scss';

function Slider() {
  const shoes = useSelector(selectorShoes);
  const dispatch = useDispatch();

  // Поточний, задіяний елемент в перетягуванні 
  const [currentBlock, setCurrentBlock] = useState(null);

  // ID картки над якою проходить перетягування задіяного елемента 
  const [overId, setOverId] = useState(null);

  // Лічильник для формування елементів в слайдері 
  const [count, setCount] = useState(0);

  // Функція для сортування відображення елементів в блоці слайдеру  
  const updateStyleByCard = useCallback((index, counted, visible) => {
    let style;
    if (index === counted) style = SLIDE_ACTIVE_LEFT;
    else if (index === counted + 1) style = SLIDE_ACTIVE_CENTER;
    else if (index === counted + 2) style = SLIDE_ACTIVE_RIGHT;
    else if (index > counted && index !== counted + 1 && index !== counted + 2) style = SLIDE_NOACTIVE_RIGHT;
    else if (index < counted) style = SLIDE_NOACTIVE_LEFT;
    if (visible) {
      style += SLIDE_CHOICE;
    }
    return style;
  });

  // Взяття картки та запис до стейту currentBlock
  const dragStartEvent = useCallback((block) => {
    setCurrentBlock(block);
  }, [currentBlock]);

  // Проходження взятої картки поверх іншої, запис до стейту overId
  const dragOverEvent = useCallback((e, block) => {
    e.preventDefault();
    setOverId(block.id);
  }, [overId]);

  // Очистка overId після проходження з області видимості 
  const dragEndEvent = useCallback(() => {
    setOverId(null);
  }, [overId]);

  // Оновлення даних в результаті drag and drop
  const updateData = (inDragBlock, inDragOverBlock, array) => {
    if (inDragBlock !== inDragOverBlock) {
      const receivedData = array.map((card) => {
        if (card.id === inDragOverBlock.id) {
          return { ...card, order: inDragBlock.order };
        }
        if (card.id === inDragBlock.id) {
          return { ...card, order: inDragOverBlock.order };
        }
        return card;
      });
      dispatch(shoesUpdateAfterDrag(receivedData));
    }
  };

  // Скидання задіяного елементу, з подальшою очисткою overId, та оновленням даних згідно функції updateData
  const dropEvent = useCallback((e, block) => {
    setOverId(null);
    e.preventDefault();
    updateData(currentBlock, block, shoes);
  }, [overId]);

  // Функція сортування елементів по order
  const sortBlock = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } 
    return -1;
  };

  // Функція по кліку в навігаційному меню слайдера
  const onPressButtonSlide = useCallback((e, somData) => {
    const { id } = e.target;
    switch (id) {
      case CLICK_PREVIOUS_BUTTON:
        setCount((prevCount) => Math.max(prevCount - 1, 0));
        break;
      case CLICK_NEXT_BUTTON: 
        setCount((prevCount) => Math.min(prevCount + 1, somData.length - 1));
        break; 
      default: break;
    }
  }, [count]);

  return (
    <SliderView
      onPressButtonSlide={(e) => onPressButtonSlide(e, shoes)}
      sortBlock={sortBlock} 
      count={count} 
      overId={overId}  
      dragStartEvent={dragStartEvent} 
      dragEndEvent={dragEndEvent} 
      dropEvent={dropEvent} 
      dragOverEvent={dragOverEvent}
      updateStyleByCard={updateStyleByCard}
    />
  );
}

export default Slider;
