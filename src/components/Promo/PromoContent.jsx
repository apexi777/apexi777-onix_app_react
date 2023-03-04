import PropTypes from 'prop-types';

function PromoContent({ activePromo, classNames }) {
  return (
    <div className={classNames}>
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
  classNames: PropTypes.string.isRequired,
};

PromoContent.defaultProps = {
  activePromo: {}
};

export default PromoContent;
