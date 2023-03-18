import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ModalView from './ModalView';

function Modal({ activePromo, onSelectModal, currency }) {
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(1);
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
  const addCount = (e) => {
    const attribute = e.target.getAttribute('data');
    if (attribute === 'data-rm') {
      if (count > 1) { 
        setCount((prevCount) => prevCount - 1);
      }
    } else if (attribute === 'data-add') {
      setCount((prevCount) => prevCount + 1);
    }
  };

  // Установка значения в соответствии с выбраной валютой
  const checkCurrencyPrice = (name) => {
    const usdRate = currency.filter((item) => item.cc === 'USD')[0].rate;
    currency.forEach((element) => {
      const { cc, rate } = element;
      if (name === cc && name !== 'USD') {
        setPrice((Math.round((activePromo.price / rate) * usdRate)) * count);
      } else if (name === 'USD') {
        setPrice(activePromo.price * count);
      }
    });
  };

  // Отработка по клику на выбраный элемент в списке валют
  const onSelectCurrency = (id) => {
    const prevSelect = currencys.filter((elem) => elem.select)[0];
    if (prevSelect.id !== id) {
      setCurrencys(currencys.map((item) => {
        return { ...item, select: (item.id === id) };
      }));
    }
  };

  // Установка символа выбраной валюты
  const getActiveCharacter = () => {
    setActiveCharacter(currencys.filter((item) => item.select)[0]); 
  };

  useEffect(() => {
    setPrice(Math.round(activePromo.price));
    getActiveCharacter();
  }, []);

  useEffect(() => {
    getActiveCharacter();
  }, [currencys]);

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
    />
  );
}

Modal.propTypes = {
  activePromo: PropTypes.shape({
    price: PropTypes.number
  }),
  onSelectModal: PropTypes.func.isRequired,
  currency: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

Modal.defaultProps = {
  activePromo: {}
};

export default Modal;
