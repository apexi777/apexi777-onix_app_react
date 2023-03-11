import { Component } from 'react';
import PropTypes from 'prop-types';

import PromoView from './PromoView';
import './sass/Promo.scss';

class Promo extends Component {
  render() {
    const { activePromo } = this.props;

    return (
      <PromoView 
        updateLoading={this.updateLoading}
        activePromo={activePromo}
      />
    );
  }
}

Promo.propTypes = {
  activePromo: PropTypes.shape(),
};

Promo.defaultProps = {
  activePromo: {}
};

export default Promo;
