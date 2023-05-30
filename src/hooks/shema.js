import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line import/prefer-default-export
export const validate = () => {
  const { t } = useTranslation();

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
  return {
    validationSchema
  };
};
