import PropTypes from 'prop-types';

function PromoContent({ activePromo }) {
  return (
    <div className={`promo_showing ${!activePromo.promo ? 'disabled' : ''}`}>
      <div className="promo_showing_title">
        <p>
          {' '}
          NikeCourt Zoom
          <br /> 
          {' '}
          {activePromo.name}
          {' '}
        </p>
      </div>
      <img className="promo_showing_element" src={activePromo.promo} alt="promo_image" />
    </div>
  );
}

PromoContent.propTypes = {
  activePromo: PropTypes.shape(),
};

PromoContent.defaultProps = {
  activePromo: {}
};

export default PromoContent;
