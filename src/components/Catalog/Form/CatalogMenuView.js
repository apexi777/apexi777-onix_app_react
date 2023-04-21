import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CatalogMenuForm from './CatalogMenuForm';

import '../sass/CatalogMenu.scss';

function CatalogMenuView({
  onSelectModal, onSortDataByPrice, data, addNewCards, filterMenuView, toggleMenuFilter 
}) {
  const { t } = useTranslation();
  return (
    <div className={`buttons ${filterMenuView ? 'active' : ''}`}>
      <button 
        type="button" 
        onClick={(e) => onSelectModal(e)} 
        className="slider_btn"
      >
        {t('catalog.menu.btn_shop')}
      </button> 
      <button 
        type="button"
        onClick={toggleMenuFilter}
        className="slider_btn sort"
      >
        <p className="sort_title">{t('catalog.menu.btn_addCard')}</p>
      </button>
      <CatalogMenuForm 
        data={data}
        onSortDataByPrice={onSortDataByPrice}
        toggleMenuFilter={toggleMenuFilter}
        addNewCards={addNewCards}
      />
    </div>
  );
}

CatalogMenuView.propTypes = {
  onSelectModal: PropTypes.func.isRequired,
  onSortDataByPrice: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  addNewCards: PropTypes.func.isRequired,
  filterMenuView: PropTypes.bool.isRequired,
  toggleMenuFilter: PropTypes.func.isRequired,
};

CatalogMenuView.defaultProps = {
  onSortDataByPrice: undefined
};

export default CatalogMenuView;
