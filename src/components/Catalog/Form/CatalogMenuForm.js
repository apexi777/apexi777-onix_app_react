// Підключення бібліотек
import { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

// Імпорт компонент
import CatalogMenuFormView from './CatalogMenuFormView';

// Імпорт стору
import { useCreateShoeMutation } from '../../../store/apis/shoes';
import { selectorShoes } from '../../../store/slices/shoes/selectors';

import '../sass/CatalogMenuForm.scss';

function CatalogMenuForm() {
  const shoes = useSelector(selectorShoes);
  const { t } = useTranslation();
  const [createShoe] = useCreateShoeMutation();

  // Обьект для валідації введених даних
  const validationSchema = yup.object({
    name: yup.string()
      .required(t('catalog.form.validate.name.req'))
      .min(4, t('catalog.form.validate.name.min')),
    price: yup.number()
      .required(t('catalog.form.validate.price.req'))
      .min(10, t('catalog.form.validate.price.min'))
      .typeError(t('catalog.form.validate.price.type')),
  });

  // Функція створення нової картки
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
      createShoe(newCards).unwrap();
    }
  }, [shoes]);

  // Хук з бібліотеки React hook form для керування формами 
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

  // Функція очищення помилок та введених даних по сумісному натиску на Ctrl та 1
  const onPressKey = (e) => {
    if (e.key === '1' && e.ctrlKey) {
      clearErrors();
      reset();
    }
  };

  // Реєстрація полів форми 
  const nameReg = register('name'); 
  const priceReg = register('price');

  // При успішній віддправці даних викликається очистка поля та помилок
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
