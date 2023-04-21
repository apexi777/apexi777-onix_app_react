import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import Currency from './ModalCurrency';

import './sass/Modal.scss';

function ModalView({
  activePromo, 
  addCount, 
  onSelectModal, 
  price, 
  count, 
  activeCharacter, 
  onSelectCurrency, 
  currencys, 
  onClickShop, 
  thanks, 
  onClickThanks 
}) {
  const { image, name } = activePromo;
  const { t } = useTranslation();
  return (
    <div className="block">
      <div className={`modal${thanks ? ' click_shop' : ''}`}>
        <Helmet>
          <meta name="description" content="Nike - price" />
          <title>Nike - price</title>
        </Helmet>
        <img src={image} alt="images" className="modal_image" />
        <div className="modal_info">
          <p className="modal_info_title">{name}</p>
          <div className="modal_info_block">
            <button type="button" data="data-rm" onClick={(e) => addCount(e)} className="modal_info_btn">-</button>
            <div className="modal_info_count">{count}</div>
            <button type="button" data="data-add" onClick={(e) => addCount(e)} className="modal_info_btn">+</button>
          </div>
        </div>
        <button aria-label="close bag" type="button" onClick={(e) => onSelectModal(e)} className="modal_close" />
        
        <div className="modal_price">
          <div className="modal_price_currency">
            <Currency 
              onSelectCurrency={onSelectCurrency}
              currencys={currencys}
            />
          </div>
          <div className="modal_price_sum">
            {t('modal.total')}
            {price}
            {activeCharacter.character}
          </div>
          <button 
            onClick={(e) => { onClickShop(e); onClickThanks(); }} 
            type="button" 
            className="modal_price_button"
          >
            {t('modal.bag')}
          </button>
        </div>
        <div className="modal_thank">
          <p>{t('modal.tnks')}</p>
        </div>
      </div>
    </div>
  );
}

ModalView.propTypes = {
  activePromo: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  addCount: PropTypes.func.isRequired,
  onSelectCurrency: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  activeCharacter: PropTypes.shape({
    character: PropTypes.string
  }).isRequired,
  onSelectModal: PropTypes.func.isRequired,
  onClickShop: PropTypes.func.isRequired,
  currencys: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  thanks: PropTypes.bool.isRequired,
  onClickThanks: PropTypes.func.isRequired,
};

export default ModalView;
