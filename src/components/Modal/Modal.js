import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { visibilityModalWindow } from '../../store/slices/visibility/slice';
import { activeCharacterUpdate, priceUpdate } from '../../store/slices/currency/slice';
import { selectorActivePromo } from '../../store/slices/shoes/selectors';
import { selectorCount, selectorCurrencyMenu } from '../../store/slices/currency/selectors';

import ModalView from './ModalView';

function Modal() {
  const dispatch = useDispatch();
  const activePromo = useSelector(selectorActivePromo);
  const count = useSelector(selectorCount);
  const currencyMenu = useSelector(selectorCurrencyMenu);

  // In modal component click to button 'add to bag' 
  const onClickShop = () => {
    const delay = 3;
    const timer = setTimeout(() => dispatch(visibilityModalWindow()), delay * 1000);
    return () => {
      clearTimeout(timer);
    };
  };

  // Update active currency symbol
  useEffect(() => {
    dispatch(activeCharacterUpdate());
  }, [currencyMenu]);

  // Update price after changing count or currencyMenu data
  useEffect(() => {
    dispatch(priceUpdate(activePromo.price));
  }, [count, currencyMenu]);

  return (
    <ModalView 
      onClickShop={onClickShop}
      image={activePromo.image}
      name={activePromo.name}
    />
  );
}

export default Modal;
