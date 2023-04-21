import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import {
  PRICE_HIGH_TO_LOW, 
  PRICE_LOW_TO_HIGH,
  PRICE_FEATURED,
} from '../../constans/translates';
import './sass/Sorting.scss';

function Sorting({ setSelectState }) {
  const { t } = useTranslation();
  return (
    <div className="sorting">
      <div className="container">
        <div className="sorting_view">
          <Select 
            placeholder={t('sorting.placeholder')}
            onChange={(value) => {
              setSelectState(value.value);
            }}
            options={
              [
                { value: PRICE_HIGH_TO_LOW, label: t('sorting.options.low') },
                { value: PRICE_LOW_TO_HIGH, label: t('sorting.options.high') },
                { value: PRICE_FEATURED, label: t('sorting.options.featured') }
              ]
          }
          />  
        </div>
      </div>
    </div>
  );
}

Sorting.propTypes = {
  setSelectState: PropTypes.func.isRequired
};

export default Sorting;
