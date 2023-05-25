import { useDispatch, useSelector } from 'react-redux';
import { onCurrencyMenuUpdate } from '../../store/slices/currency/slice';
import { selectorCurrencyMenu } from '../../store/slices/currency/selectors';

import './sass/ModalCurrency.scss';

function Currency() {
  const dispatch = useDispatch();
  const currencyMenu = useSelector(selectorCurrencyMenu);
  const currencyMenuClone = currencyMenu.slice();
  return (
    <div className="currency">
      {
        currencyMenuClone.map(({
          name, id, select 
        }) => (
          <button 
            type="button" 
            className={`currency_nav${select ? ' select' : ''}`}
            key={id}
            // Встановлення валюти згідно id 
            onClick={() => dispatch(onCurrencyMenuUpdate(id))}
          >
            {name}
          </button>
        ))
      }
    </div>
  );
}

export default Currency;
