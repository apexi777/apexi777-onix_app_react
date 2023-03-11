import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';

import CatalogMenuFormView from './CatalogMenuFormView';

import '../sass/CatalogMenuForm.scss';

function CatalogMenuForm({ toggleMenuFilter, addNewCards }) {
  const validationSchema = yup.object({
    name: yup.string()
      .min(4, 'Minimum 4 characters ')
      .required('It is a required field.'),
    price: yup.number()
      .required('It is a required field.')
      .min(10, 'Minimal number 10')
      .typeError('Price must be a number'),
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
      clearErrors={clearErrors}
      reset={reset}
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
