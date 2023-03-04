import { Component } from 'react';
import PropTypes from 'prop-types';

import CatalogMenuForm from './CatalogMenuForm';

import './sass/CatalogMenu.scss';

class CatalogMenuView extends Component {
  render() {
    const {
      onSelectModal, onSortDataByPrice, data, addNewCards, filterMenuView, toggleMenuFilter 
    } = this.props;
    return (
      <div className={filterMenuView}>
        <button type="button" onClick={(e) => onSelectModal(e)} className="slider_btn">shop now</button> 
        <button type="button" onClick={toggleMenuFilter} className="slider_btn sort">
          <p className="sort_title">Add new Card</p>
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
}

CatalogMenuView.propTypes = {
  onSelectModal: PropTypes.func.isRequired,
  onSortDataByPrice: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  addNewCards: PropTypes.func.isRequired,
  filterMenuView: PropTypes.string.isRequired,
  toggleMenuFilter: PropTypes.func.isRequired,
};

CatalogMenuView.defaultProps = {
  onSortDataByPrice: undefined
};

export default CatalogMenuView;
