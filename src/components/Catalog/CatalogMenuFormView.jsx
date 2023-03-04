import { Component } from 'react';
import PropTypes from 'prop-types';

class CatalogMenuFormView extends Component {
  render() {
    const {
      nameReg, priceReg, handleSubmit, addNewCards, errors, toggleMenuFilter 
    } = this.props;
    return (
      <div className="cards">
        <div className="cards_menu">
          <h3 className="cards_title">Create a new shoe card</h3>
          <form className="form" onSubmit={handleSubmit((data) => { addNewCards(data.name, data.price); })}>
            <input 
              onChange={nameReg.onChange}
              onBlur={nameReg.onBlur}
              name={nameReg.name}
              ref={nameReg.ref}
              type="name"
              placeholder="Enter name"
            />
            <div className="error_name">
              {errors?.name?.message}
            </div>
            <input 
              onChange={priceReg.onChange}
              onBlur={priceReg.onBlur}
              name={priceReg.name}
              ref={priceReg.ref}
              type="price"
              placeholder="Enter price"
            />
            <div className="error_price">
              {errors?.price?.message}
            </div>
            <button className="form_submit" type="submit">Add Card</button>
          </form>
        </div>
        <button aria-label="close form" type="button" onClick={toggleMenuFilter} className="cards_close" />
      </div>  
    );
  }
}

CatalogMenuFormView.propTypes = {
  toggleMenuFilter: PropTypes.func.isRequired,
  addNewCards: PropTypes.func.isRequired,
  nameReg: PropTypes.shape().isRequired,
  priceReg: PropTypes.shape().isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape().isRequired,
};

export default CatalogMenuFormView;
