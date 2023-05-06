import {
  useEffect 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  visibilityModalWindow
} from '../../store/slice/visibility';

import {
  activeCharacterUpdate,
  priceUpdate
} from '../../store/slice/currency';

import ModalView from './ModalView';

function Modal() {
  const dispatch = useDispatch();
  const activePromo = useSelector((state) => state.shoes.activePromo);
  const count = useSelector((state) => state.currency.count);
  const currencyMenu = useSelector((state) => state.currency.currencyMenu);

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
