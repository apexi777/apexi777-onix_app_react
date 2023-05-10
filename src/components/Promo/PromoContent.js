import { useDispatch, useSelector } from 'react-redux';
import { promoLoadingStatus } from '../../store/slices/visibility/slice';

import { selectorActivePromo } from '../../store/slices/shoes/selectors';
import { selectorPromoLoading } from '../../store/slices/visibility/selectors';

function PromoContent() {
  const dispatch = useDispatch();
  const promoLoading = useSelector(selectorPromoLoading);
  const activePromo = useSelector(selectorActivePromo);

  return (
    <div className={`promo_showing ${!activePromo?.promo ? 'disabled' : ''}`}>
      <div className="promo_showing_title">
        <p>
          {' '}
          NikeCourt Zoom
          <br /> 
          {' '}
          {activePromo?.name}
          {' '}
        </p>
      </div>
      <img 
        className="promo_showing_element" 
        onLoad={() => dispatch(promoLoadingStatus())}
        src={!promoLoading ? `${`${process.env.PUBLIC_URL}/assets/spinner.svg`}` : `${activePromo?.promo}`} 
        alt="promo_image"
      />
    </div>
  );
}

export default PromoContent;
