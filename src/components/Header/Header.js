// Підключення бібліотек
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Імпорт стору
import { 
  searchUpdate, 
  searchRequest,
  activePromoUpdate
} from '../../store/slices/shoes/slice';
import { langUpdate } from '../../store/slices/header/slice';
import { selectorSearchValue } from '../../store/slices/shoes/selectors';

// Імпорт компонент
import HeaderView from './HeaderView';

function Header() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const searchValue = useSelector(selectorSearchValue);

  // Валідація введених данних в пошуковій строці та внесення до змінної searchValue
  const onValidateSearch = useCallback((e) => {
    const value = e.target.value.replace(/[^A-Za-z0-9]/, '');
    dispatch(searchUpdate(value));
  }, [searchValue]);

  // Перевірка даних на входження з пошукового запиту
  useEffect(() => {
    dispatch(searchRequest());
    // Встановлення активної картки на випадок її відсутності
    dispatch(activePromoUpdate());
  }, [searchValue]);

  // Ініціалізація мовних даних 
  useEffect(() => {
    dispatch(langUpdate({ localLng: i18n }));
  }, []);

  return (
    <HeaderView
      onValidateSearch={onValidateSearch}
    />    
  );
}

export default Header;
