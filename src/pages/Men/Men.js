import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';

// Import from store
import { fetchData, setActivePromoCard } from '../../store/slices/shoes/slice';
import { selectorShoes } from '../../store/slices/shoes/selectors';
import { selectorActiveModal } from '../../store/slices/visibility/selectors';
import { fetchCurrency } from '../../store/slices/currency/slice';

// Import components
import Promo from '../../components/Promo/Promo';
import Sorting from '../../components/Sorting/Sorting';
import Catalog from '../../components/Catalog/Catalog';
import Modal from '../../components/Modal/Modal';

function Men() {
  const dispatch = useDispatch();
  const shoes = useSelector(selectorShoes);
  const activeModal = useSelector(selectorActiveModal);

  useEffect(() => {
    // First getting data shoes and currency
    dispatch(fetchData());
    dispatch(fetchCurrency());
  }, []);

  // Searching and set active card
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
