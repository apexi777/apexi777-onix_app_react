import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/httpHook';

import { 
  shoesFetching, 
  shoesFetched,
  shoesFetchingError,
  setActivePromoCard
} from '../../store/slice/data';

import { 
  currencyFetching, 
  currencyFetched,
  currencyFetchingError
} from '../../store/slice/currency';

// Import components
import Promo from '../../components/Promo/Promo';
import Sorting from '../../components/Sorting/Sorting';
import Catalog from '../../components/Catalog/Catalog';
import Modal from '../../components/Modal/Modal';

function Men() {
  const dispatch = useDispatch();
  const { request } = useHttp();
  const shoes = useSelector((state) => state.shoes.shoes);
  const activeModal = useSelector((state) => state.visibility.activeModal);

  useEffect(() => {
    // Отримання даних взуття
    dispatch(shoesFetching());
    request('http://localhost:3001/data', true)
      .then((data) => dispatch(shoesFetched(data)))
      .catch(() => dispatch(shoesFetchingError()));

    // Отримання даних валюти
    dispatch(currencyFetching());
    request('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .then((data) => dispatch(currencyFetched(data)))
      .catch(() => dispatch(currencyFetchingError()));
  }, []);

  // Пошук та встановлення активної картки
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
