import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import CatalogMenuFormView from './CatalogMenuFormView';

import '../sass/CatalogMenuForm.scss';

function CatalogMenuForm({ toggleMenuFilter, addNewCards }) {
  const { t } = useTranslation();

  const validationSchema = yup.object({
    name: yup.string()
      .required(t('catalog.form.validate.name.req'))
      .min(4, t('catalog.form.validate.name.min')),
    price: yup.number()
      .required(t('catalog.form.validate.price.req'))
      .min(10, t('catalog.form.validate.price.min'))
      .typeError(t('catalog.form.validate.price.type')),
  });

  const {
    register,
    handleSubmit,
    clearErrors,
    formState,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      price: ''
    },
    mode: 'all',
    resolver: yupResolver(validationSchema)
  });

  const onPressKey = (e) => {
    if (e.key === '1' && e.ctrlKey) {
      clearErrors();
      reset();
    }
  };

  const nameReg = register('name'); 
  const priceReg = register('price');

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      clearErrors();
      reset();
    }
  }, [formState, reset, clearErrors]);

  return (
    <CatalogMenuFormView 
      onPressKey={onPressKey}
      nameReg={nameReg}
      priceReg={priceReg}
      handleSubmit={handleSubmit}
      errors={errors}
      toggleMenuFilter={toggleMenuFilter}
      addNewCards={addNewCards}
    />
  );
}

CatalogMenuForm.propTypes = {
  toggleMenuFilter: PropTypes.func.isRequired,
  addNewCards: PropTypes.func.isRequired,
};

export default CatalogMenuForm;
