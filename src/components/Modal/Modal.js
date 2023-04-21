import {
  useState, useEffect, useCallback 
} from 'react';
import PropTypes from 'prop-types';

import ModalView from './ModalView';

function Modal({
  activePromo, onSelectModal, currency, onClickShop 
}) {
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(1);
  const [thanks, setThanks] = useState(false);
  const [activeCharacter, setActiveCharacter] = useState({});
  const [currencys, setCurrencys] = useState([
    {
      id: 900, name: 'USD', character: '$', select: true 
    },
    {
      id: 901, name: 'UAH', character: '₴', select: false 
    },
    {
      id: 902, name: 'EUR', character: '€', select: false 
    }
  ]);

  // Отработка по нажатию на кнопки добавление/удаление колличества пар обуви
  const addCount = useCallback((e) => {
    const attribute = e.target.getAttribute('data');
    if (attribute === 'data-rm') {
      if (count > 1) { 
        setCount((prevCount) => prevCount - 1);
      }
    } else if (attribute === 'data-add') {
      setCount((prevCount) => prevCount + 1);
    }
  }, [count]);

  // Установка значения в соответствии с выбраной валютой
  const checkCurrencyPrice = (name = 'USD') => {
    const usdRate = currency.find((item) => item.cc === 'USD').rate;
    const desiredName = currency.find((item) => item.cc === name);
    if (desiredName.cc === 'USD') {
      setPrice(activePromo.price * count);
    } else {
      setPrice((Math.round((activePromo.price / desiredName.rate) * usdRate)) * count);
    }
  };

  // Отработка по клику на выбраный элемент в списке валют
  const onSelectCurrency = useCallback((id) => {
    const prevSelect = currencys.filter((elem) => elem.select)[0];
    if (prevSelect.id !== id) {
      setCurrencys((prevCurrencys) => prevCurrencys.map((item) => {
        return { ...item, select: (item.id === id) };
      }));
    }
  }, [currencys]);

  // Установка символа выбраной валюты
  const getActiveCharacter = () => {
    setActiveCharacter(currencys.filter((item) => item.select)[0]); 
  };

  // Отображение благодарности по клику на кнопку "add to bag"
  const onClickThanks = useCallback(() => {
    setThanks((prevThanks) => !prevThanks);
  });

  // Установка первоначального значения цены
  useEffect(() => {
    setPrice(Math.round(activePromo.price));
    getActiveCharacter();
  }, []);

  // Установка эмблемы валюты при перерендере
  useEffect(() => {
    getActiveCharacter();
  }, [currencys]);

  // Установка цены в соответствие с изминением количества и валюты
  useEffect(() => {
    checkCurrencyPrice(activeCharacter.name);
  }, [count, activeCharacter]);

  return (
    <ModalView 
      activePromo={activePromo}
      addCount={addCount}
      onSelectModal={onSelectModal}
      price={price}
      count={count}
      activeCharacter={activeCharacter}
      onSelectCurrency={onSelectCurrency}
      currencys={currencys}
      onClickShop={onClickShop}
      thanks={thanks}
      onClickThanks={onClickThanks}
    />
  );
}

Modal.propTypes = {
  activePromo: PropTypes.shape({
    price: PropTypes.number
  }),
  onSelectModal: PropTypes.func.isRequired,
  onClickShop: PropTypes.func.isRequired,
  currency: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

Modal.defaultProps = {
  activePromo: {}
};

export default Modal;
