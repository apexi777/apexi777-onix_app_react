import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import CatalogMenuView from './CatalogMenuView';

function CatalogMenu({
  onSelectModal, onSortDataByPrice, data, addNewCards 
}) {
  const [filterMenuView, setFilterMenuView] = useState('buttons');
  
  const toggleMenuFilter = () => {
    if (filterMenuView === 'buttons') {
      setFilterMenuView('buttons active');
    } else setFilterMenuView('buttons');
  };

  useEffect(() => {
    if (data.length === 0) {
      setFilterMenuView('buttons deactivated');
    } else {
      setFilterMenuView('buttons');
    }
  }, [data.length]);
    
  return (
    <CatalogMenuView 
      onSelectModal={onSelectModal}
      onSortDataByPrice={onSortDataByPrice}
      data={data}
      addNewCards={addNewCards}
      toggleMenuFilter={toggleMenuFilter}
      filterMenuView={filterMenuView}
    />
  );
}

CatalogMenu.propTypes = {
  onSelectModal: PropTypes.func.isRequired,
  onSortDataByPrice: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  addNewCards: PropTypes.func.isRequired,
};

CatalogMenu.defaultProps = {
  onSortDataByPrice: undefined
};

export default CatalogMenu;
