import { Component } from 'react';

class PromoView extends Component {
  render() {
    return (
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
    );
  }
}

export default PromoView;
