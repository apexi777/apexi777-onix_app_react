// Підключення бібліотек
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

// Імпорт стору
import { visibilityModalWindow, thanksActivated } from '../../store/slices/visibility/slice';
import { selectorThanksInModal } from '../../store/slices/visibility/selectors';
import { countChange } from '../../store/slices/currency/slice';
import { selectorPrice, selectorCount, selectorActiveCharacter } from '../../store/slices/currency/selectors';

// Імпорт компонент
import Currency from './ModalCurrency';

import './sass/Modal.scss';

function ModalView({  
  name, 
  image, 
  onClickShop
}) {
  const thanks = useSelector(selectorThanksInModal);
  const price = useSelector(selectorPrice);
  const count = useSelector(selectorCount);
  const activeCharacter = useSelector(selectorActiveCharacter);
  const { t } = useTranslation();
  const dispatch = useDispatch();
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
            <button 
              type="button" 
              data="data-rm" 
              // Коригування змінної count згідно атрибуту data
              onClick={(e) => dispatch(countChange(e.target.getAttribute('data')))} 
              className="modal_info_btn"
            >
              -

            </button>
            <div className="modal_info_count">{count}</div>
            <button 
              type="button"
              data="data-add"
              // Коригування змінної count згідно атрибуту data
              onClick={(e) => dispatch(countChange(e.target.getAttribute('data')))} 
              className="modal_info_btn"
            >
              +
            </button>
          </div>
        </div>
        <button 
          aria-label="close bag"
          type="button"
          onClick={() => dispatch(visibilityModalWindow())}
          className="modal_close"
        />
        
        <div className="modal_price">
          <div className="modal_price_currency">
            <Currency />
          </div>
          <div className="modal_price_sum">
            {t('modal.total')}
            {price}
            {activeCharacter.character}
          </div>
          <button 
            onClick={() => {
              onClickShop(); 
              dispatch(thanksActivated()); 
            }} 
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
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClickShop: PropTypes.func.isRequired,
};

export default ModalView;
