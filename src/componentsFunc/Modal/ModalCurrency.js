import PropTypes from 'prop-types';

import './sass/ModalCurrency.scss';

function Currency({ onSelectCurrency, currencys }) {
  return (
    <div className="currency">
      {
        currencys.map(({
          name, id, select 
        }) => (
          <button 
            type="button" 
            className={`currency_nav${select ? ' select' : ''}`}
            key={id}
            onClick={() => onSelectCurrency(id, name)}
          >
            {name}
          </button>
        ))
      }
    </div>
  );
}

Currency.propTypes = {
  onSelectCurrency: PropTypes.func.isRequired,
  currencys: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    select: PropTypes.bool,
  })).isRequired,
};

export default Currency;
