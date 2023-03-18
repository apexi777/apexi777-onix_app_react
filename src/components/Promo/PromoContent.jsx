import PropTypes from 'prop-types';

function PromoContent({ activePromo }) {
  const { promo, name } = activePromo;
  return (
    <div className={`promo_showing ${!promo ? 'disabled' : ''}`}>
      <div className="promo_showing_title">
        <p>
          {' '}
          NikeCourt Zoom
          <br /> 
          {' '}
          {name}
          {' '}
        </p>
      </div>
      <img className="promo_showing_element" src={promo} alt="promo_image" />
    </div>
  );
}

PromoContent.propTypes = {
  activePromo: PropTypes.shape({
    promo: PropTypes.string,
    name: PropTypes.string
  }),
};

PromoContent.defaultProps = {
  activePromo: {}
};

export default PromoContent;
