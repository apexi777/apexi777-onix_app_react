import { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';

import { shoesCreated } from '../../../store/slice/data';
import { useHttp } from '../../../hooks/httpHook';
import CatalogMenuFormView from './CatalogMenuFormView';

import '../sass/CatalogMenuForm.scss';

function CatalogMenuForm() {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.shoes.shoes);
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

  // Add new object to data object
  const addNewCards = useCallback((name, price) => {
    if (typeof (name) === 'string' && typeof (price) === 'number') {
      const newCards = {
        image: '',
        name,
        order: shoes.length + 1,
        visibleOnPromo: false,
        promo: `${process.env.PUBLIC_URL}/assets/img/promo/promo_green_shoes.png`,
        id: uuidv4(),
        price,
        select: {}
      };
      request('http://localhost:3001/data', true, 'POST', JSON.stringify(newCards))
        // eslint-disable-next-line no-console
        .then((res) => console.log(res, 'Отправка успешна'));
      dispatch(shoesCreated(newCards));
    }
  }, [shoes]);

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
      errors={errors}
      onSubmit={handleSubmit((data) => addNewCards(data.name, data.price))}
    />
  );
}

export default CatalogMenuForm;
