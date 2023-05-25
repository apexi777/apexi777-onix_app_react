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
import { langInitialization } from '../../store/slices/header/slice';
import { selectorLang } from '../../store/slices/header/selectors';
import { selectorSearchValue } from '../../store/slices/shoes/selectors';

// Імпорт компонент
import HeaderView from './HeaderView';

function Header() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const searchValue = useSelector(selectorSearchValue);
  const lang = useSelector(selectorLang);

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
    dispatch(langInitialization(i18n.language));
  }, []);

  // Оновлення мовних даних після оновлення змінної lang
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <HeaderView
      onValidateSearch={onValidateSearch}
    />    
  );
}

export default Header;
