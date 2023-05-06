import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { 
  filterMenuToggle,
  visibilityModalWindow
} from '../../../store/slice/visibility';

import CatalogMenuForm from './CatalogMenuForm';
import '../sass/CatalogMenu.scss';

function CatalogMenu() {
  const filterMenuView = useSelector((state) => state.visibility.filterMenuView);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className={`buttons ${filterMenuView ? 'active' : ''}`}>
      <button 
        type="button" 
        onClick={() => dispatch(visibilityModalWindow())} 
        className="slider_btn"
      >
        {t('catalog.menu.btn_shop')}
      </button> 
      <button 
        type="button"
        onClick={() => dispatch(filterMenuToggle())}
        className="slider_btn sort"
      >
        <p className="sort_title">{t('catalog.menu.btn_addCard')}</p>
      </button>
      <CatalogMenuForm />
    </div>
  );
}

export default CatalogMenu;
