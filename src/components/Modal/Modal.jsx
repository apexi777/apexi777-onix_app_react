import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ModalView from './ModalView';

function Modal({ activePromo, onSelectModal }) {
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(1);

  useEffect(() => {
    function update() {
      setPrice(Math.max(0, count * activePromo.price));
    }
    update(count);
  });

  const addCount = (e) => {
    const attribute = e.target.getAttribute('data');
    if (attribute === 'data-rm') {
      if (count !== 1) { 
        setCount((prevCount) => prevCount - 1);
      }
    } else if (attribute === 'data-add') {
      setCount((prevCount) => prevCount + 1);
    }
  };

  return (
    <ModalView 
      activePromo={activePromo}
      addCount={addCount}
      onSelectModal={onSelectModal}
      price={price}
      count={count}
    />
  );
}

Modal.propTypes = {
  activePromo: PropTypes.shape(),
  onSelectModal: PropTypes.func.isRequired
};

Modal.defaultProps = {
  activePromo: {}
};

export default Modal;
