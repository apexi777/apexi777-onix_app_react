import { Component } from 'react';
import PropTypes from 'prop-types';

import MyContext from '../../context';

class PromoContent extends Component {
  render() {
    const { updateLoading, loaded } = this.props;
    return (
      <MyContext.Consumer>
        {(value) => (
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
              // src={`${value?.promo}`} 
              src={!loaded ? `${`${process.env.PUBLIC_URL}/assets/spinner.svg`}` : `${value?.promo}`} 
              alt="promo_image" 
            />
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}

PromoContent.propTypes = {
  updateLoading: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
};

export default PromoContent;
