import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import PromoView from './PromoView';
import PromoContent from './PromoContent';
import './sass/Promo.scss';

function Promo({ activePromo }) {
  // Checking the current element PromoContent
  const [activeContent, setActiveContent] = useState('promo_showing');

  useEffect(() => {
    if (activePromo === undefined) {
      setActiveContent('promo_showing disabled');
    } else {
      setActiveContent('promo_showing');
    }
  }, [activePromo]);

  return (
    <div className="promo">
      <div className="container">
        <PromoView />
        <PromoContent 
          activePromo={activePromo}
          classNames={activeContent}
        />
      </div>
    </div>
  );
}

Promo.propTypes = {
  activePromo: PropTypes.shape(),
};

Promo.defaultProps = {
  activePromo: undefined
};

export default Promo;
