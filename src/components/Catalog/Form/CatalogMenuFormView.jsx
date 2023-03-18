import { Component } from 'react';
import PropTypes from 'prop-types';

class CatalogMenuFormView extends Component {
  render() {
    const {
      nameReg, priceReg, handleSubmit, addNewCards, clearErrors, reset, errors, toggleMenuFilter 
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
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === '1' && e.ctrlKey) {
                  clearErrors();
                  reset();
                }
              }}
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
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === '1' && e.ctrlKey) {
                  clearErrors();
                  reset();
                }
              }}
            />
            <div className="error_price">
              {errors?.price?.message}
            </div>
            <button className="form_submit" type="submit">Add Card</button>
            <p className="form_info">After change - press ctrl+1 to reset form</p>
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
  nameReg: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    ref: PropTypes.func
  }).isRequired,
  priceReg: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    ref: PropTypes.func
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    name: PropTypes.shape({
      message: PropTypes.string
    }),
    price: PropTypes.shape({
      message: PropTypes.string
    })
  }).isRequired,
  clearErrors: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default CatalogMenuFormView;
