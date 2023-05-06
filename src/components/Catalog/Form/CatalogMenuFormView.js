import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { filterMenuToggle } from '../../../store/slice/visibility';

function CatalogMenuFormView({
  nameReg, priceReg, onSubmit, onPressKey, errors 
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <div className="cards">
      <div className="cards_menu">
        <h3 className="cards_title">{t('catalog.form.title')}</h3>
        <form 
          className="form"
          onSubmit={onSubmit}
        >
          <input 
            onChange={nameReg.onChange}
            onBlur={nameReg.onBlur}
            name={nameReg.name}
            ref={nameReg.ref}
            type="name"
            placeholder={t('catalog.form.placeholder.name')}
            tabIndex={0}
            onKeyDown={(e) => onPressKey(e)}
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
            placeholder={t('catalog.form.placeholder.price')}
            tabIndex={0}
            onKeyDown={(e) => onPressKey(e)}
          />
          <div className="error_price">
            {errors?.price?.message}
          </div>
          <button className="form_submit" type="submit">{t('catalog.form.submit')}</button>
          <p className="form_info">{t('catalog.form.info')}</p>
        </form>
      </div>
      <button 
        aria-label="close form" 
        type="button"
        onClick={() => dispatch(filterMenuToggle())}
        className="cards_close"
      />
    </div>  
  );
}

CatalogMenuFormView.propTypes = {
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
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    name: PropTypes.shape({
      message: PropTypes.string
    }),
    price: PropTypes.shape({
      message: PropTypes.string
    })
  }).isRequired,
  onPressKey: PropTypes.func.isRequired,
};

export default CatalogMenuFormView;
