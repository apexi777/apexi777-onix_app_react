import { Component } from 'react';
import PropTypes from 'prop-types';

import PromoContent from './PromoContent';

class PromoView extends Component {
  render() {
    const { updateLoading, loaded } = this.props;
    return (
      <div className="promo">
        <div className="container">
          <div className="promo_block">
            <div className="promo_block_header">
              JUST 
              {' '}
              <br />
              {' '}
              DO
              <br />
              {' '}
              IT
              <br />
            </div>
            <div className="promo_block_subheader">
              Innovated to withstand your toughest matches, 
              this updated design puts flexible, 
              durable materials exactly where they&apos;re needed most. 
            </div>
          </div>
          <PromoContent 
            loaded={loaded}
            updateLoading={updateLoading}
          />
        </div>
      </div>
    );
  }
}

PromoView.propTypes = {
  updateLoading: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired
};

export default PromoView;
