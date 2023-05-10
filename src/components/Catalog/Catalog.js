import { useSelector } from 'react-redux';
import Slider from './Slider/Slider';
import CatalogMenu from './Form/CatalogMenu';
import { selectorShoes } from '../../store/slices/shoes/selectors';
import './sass/Catalog.scss';

function Catalog() {
  const shoes = useSelector(selectorShoes);
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
