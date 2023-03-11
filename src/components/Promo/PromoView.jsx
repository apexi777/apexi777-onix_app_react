import { Component } from 'react';
import PropTypes from 'prop-types';
import PromoContent from './PromoContent';

class PromoView extends Component {
  render() {
    const { activePromo } = this.props;
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
          <PromoContent activePromo={activePromo} />
        </div>
      </div>
    );
  }
}

PromoView.propTypes = {
  activePromo: PropTypes.shape(),
};

PromoView.defaultProps = {
  activePromo: {}
};

export default PromoView;
