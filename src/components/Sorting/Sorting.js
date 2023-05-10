import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { useSorting } from '../../hooks/sortingHook';

import { 
  shoesApplyFilter,
  shoesUpdateAfterDrag
} from '../../store/slices/shoes/slice';

import {
  selectorShoes,
  selectorFilter
} from '../../store/slices/shoes/selectors';

import {
  PRICE_HIGH_TO_LOW, 
  PRICE_LOW_TO_HIGH,
  PRICE_FEATURED,
} from '../../constans/translates';

import './sass/Sorting.scss';

function Sorting() {
  const filter = useSelector(selectorFilter);
  const shoes = useSelector(selectorShoes);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { onSortDataByPrice } = useSorting();

  useEffect(() => {
    if (filter !== null) {
      const result = onSortDataByPrice(shoes, filter);
      dispatch(shoesUpdateAfterDrag(result));
    }
  }, [filter]);

  return (
    <div className="sorting">
      <div className="container">
        <div className="sorting_view">
          <Select 
            placeholder={t('sorting.placeholder')}
            onChange={(value) => {
              dispatch(shoesApplyFilter(value.value));
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

export default Sorting;
