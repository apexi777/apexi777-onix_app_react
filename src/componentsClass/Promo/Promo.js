import { Component } from 'react';

import PromoView from './PromoView';
import './sass/Promo.scss';

class Promo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  updateLoading = () => {
    this.setState(({ loaded: true }));
  };

  render() {
    const { loaded } = this.state;
    return (
      <PromoView 
        loaded={loaded}
        updateLoading={this.updateLoading}
      />
    );
  }
}

export default Promo;
