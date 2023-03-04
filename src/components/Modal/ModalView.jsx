import { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import './sass/Modal.scss';

class ModalView extends Component {
  render() {
    const {
      activePromo, addCount, onSelectModal, price, count 
    } = this.props;
    return (
      <div className="modal">
        <Helmet>
          <meta name="description" content="Nike - price" />
          <title>Nike - price</title>
        </Helmet>
        <img src={activePromo.image} alt="images" className="modal_image" />
        <div className="modal_info">
          <p className="modal_info_title">{activePromo.name}</p>
          <div className="modal_info_block">
            <button type="button" data="data-rm" onClick={(e) => addCount(e)} className="modal_info_btn">-</button>
            <div className="modal_info_count">{count}</div>
            <button type="button" data="data-add" onClick={(e) => addCount(e)} className="modal_info_btn">+</button>
          </div>
        </div>
        <button aria-label="close bag" type="button" onClick={(e) => onSelectModal(e)} className="modal_close" />
        <div className="modal_price">
          <div className="modal_price_sum">
            total :
            {price}
            $
          </div>
          <button type="button" className="modal_price_button">add to bag</button>
        </div>
      </div>
    );
  }
}

ModalView.propTypes = {
  activePromo: PropTypes.shape().isRequired,
  addCount: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onSelectModal: PropTypes.func.isRequired
};

export default ModalView;
