import { useState } from 'react';
import PromoView from './PromoView';
import './sass/Promo.scss';

function Promo() {
  const [loaded, setLoaded] = useState(false);

  const updateLoading = () => {
    setLoaded(true);
  };

  return (
    <PromoView 
      loaded={loaded}
      updateLoading={updateLoading}
    />
  );
}

export default Promo;
