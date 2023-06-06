import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { visibilityModalWindow, thanksActivated } from '../../store/slices/visibility/slice';
import { priceUpdate } from '../../store/slices/currency/slice';
import { selectorActivePromo } from '../../store/slices/shoes/selectors';
import { selectorCount, selectorCurrencyMenu } from '../../store/slices/currency/selectors';

import ModalView from './ModalView';

function Modal() {
  const dispatch = useDispatch();
  const activePromo = useSelector(selectorActivePromo);
  const count = useSelector(selectorCount);
  const currencyMenu = useSelector(selectorCurrencyMenu);

  // Закриття попапу по тайм-ауту в delay
  const onClickShop = () => {
    dispatch(thanksActivated()); 
    const delay = 3;
    setTimeout(() => dispatch(visibilityModalWindow()), delay * 1000);
  };

  // Оновлення прайсу згідно з обраною валютою та кількістю товару
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
