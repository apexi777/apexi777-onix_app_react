import { useContext } from 'react';
import PropTypes from 'prop-types';

import MyContext from '../../context';

function PromoContent({ updateLoading, loaded }) {
  const value = useContext(MyContext);
  return (
    <div className={`promo_showing ${!value?.promo ? 'disabled' : ''}`}>
      <div className="promo_showing_title">
        <p>
          {' '}
          NikeCourt Zoom
          <br /> 
          {' '}
          {value?.name}
          {' '}
        </p>
      </div>
      <img 
        className="promo_showing_element" 
        onLoad={updateLoading}
        src={!loaded ? `${`${process.env.PUBLIC_URL}/assets/spinner.svg`}` : `${value?.promo}`} 
        alt="promo_image"
      />
    </div>
  );
}

PromoContent.propTypes = {
  updateLoading: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
};

export default PromoContent;
