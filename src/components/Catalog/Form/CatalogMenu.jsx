import { useState } from 'react';
import PropTypes from 'prop-types';

import CatalogMenuView from './CatalogMenuView';

function CatalogMenu({
  onSelectModal, onSortDataByPrice, data, addNewCards 
}) {
  const [filterMenuView, setFilterMenuView] = useState(false);
  
  const toggleMenuFilter = () => {
    setFilterMenuView((prevState) => !prevState);
  };
    
  return data.length !== 0
    ? (
      <CatalogMenuView 
        onSelectModal={onSelectModal}
        onSortDataByPrice={onSortDataByPrice}
        data={data}
        addNewCards={addNewCards}
        toggleMenuFilter={toggleMenuFilter}
        filterMenuView={filterMenuView}
      />
    )
    : null;
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
