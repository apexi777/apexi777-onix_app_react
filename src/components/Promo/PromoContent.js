// import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { promoLoadingStatus } from '../../store/slice/visibility';

// import MyContext from '../../context';

function PromoContent() {
  const dispatch = useDispatch();
  const promoLoading = useSelector((state) => state.visibility.promoLoading);
  const activePromo = useSelector((state) => state.shoes.activePromo);

  // const value = useContext(MyContext);
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
