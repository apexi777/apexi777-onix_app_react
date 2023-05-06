import { useDispatch, useSelector } from 'react-redux';

import {
  onCurrencyMenuUpdate
} from '../../store/slice/currency';

import './sass/ModalCurrency.scss';

function Currency() {
  const dispatch = useDispatch();
  const currencyMenu = useSelector((state) => state.currency.currencyMenu);
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
