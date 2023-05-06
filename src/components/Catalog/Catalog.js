import { useSelector } from 'react-redux';
import Slider from './Slider/Slider';
import CatalogMenu from './Form/CatalogMenu';

import './sass/Catalog.scss';

function Catalog() {
  const shoes = useSelector((state) => state.shoes.shoes);
  return (
    <div className="slider">
      <div className="container">
        {shoes.length !== 0
          ? (
            <>
              <CatalogMenu />
              <Slider />
            </>
          )
          : null}
      </div>
    </div>
  );
}

export default Catalog;
