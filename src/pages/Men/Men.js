// Підключення бібліотек
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';

// Імпорти власних хуків
import { transformData } from '../../hooks/currencyHook';

// Імпорт стору
import { fetchingData, setActivePromoCard } from '../../store/slices/shoes/slice';
import { selectorShoes } from '../../store/slices/shoes/selectors';
import { selectorActiveModal } from '../../store/slices/visibility/selectors';
import { fetchingCurrency } from '../../store/slices/currency/slice';
import { useGetShoesQuery } from '../../store/apis/shoes';
import { useGetCurrencyQuery } from '../../store/apis/currency';

// Імпорти підключених компонент
import Promo from '../../components/Promo/Promo';
import Sorting from '../../components/Sorting/Sorting';
import Catalog from '../../components/Catalog/Catalog';
import Modal from '../../components/Modal/Modal';

function Men() {
  const dispatch = useDispatch();
  const shoes = useSelector(selectorShoes);
  const activeModal = useSelector(selectorActiveModal);

  const {
    data: shoesData = [],
    isSuccess: isSuccessShoes,
    isFetching,
  } = useGetShoesQuery();

  const {
    data: currencyObject,
    isSuccess: isSuccessCurrency,
  } = useGetCurrencyQuery();

  // Отримання даних взуття від локальної АРІ json-server
  useEffect(() => {
    if (isSuccessShoes) {
      dispatch(fetchingData(shoesData));
    }
  }, [isSuccessShoes, shoesData, isFetching]); // При першому монтуванні та при зміні даних в БД

  // Отримання даних валюти від АРІ National Bank Ukraine
  useEffect(() => {
    if (isSuccessCurrency) {
      transformData(currencyObject)
        .then((data) => dispatch(fetchingCurrency(data)));
    }
  }, [isSuccessCurrency]);

  // Встановлення активної картки при зміні даних взуття
  useEffect(() => {
    dispatch(setActivePromoCard());
  }, [shoes]);

  return (
    <>  
      <Helmet>
        <meta name="description" content="Nike - Men Page" />
        <title>Nike - Men Page</title>
      </Helmet>
      <Promo />
      <Sorting />
      <Catalog />  
      {activeModal 
        ? (
          <Modal />
        ) 
        : null}
    </>
  );
}

export default Men;
