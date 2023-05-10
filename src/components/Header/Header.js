import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { 
  searchUpdate, 
  searchRequest,
  activePromoUpdate
} from '../../store/slices/shoes/slice';
import { langInitialization } from '../../store/slices/header/slice';
import { selectorLang } from '../../store/slices/header/selectors';
import { selectorSearchValue } from '../../store/slices/shoes/selectors';

import HeaderView from './HeaderView';

function Header() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const searchValue = useSelector(selectorSearchValue);
  const lang = useSelector(selectorLang);

  // Sending the search data to the parent component
  const onValidateSearch = useCallback((e) => {
    const value = e.target.value.replace(/[^A-Za-z0-9]/, '');
    dispatch(searchUpdate(value));
  }, [searchValue]);

  useEffect(() => {
    dispatch(searchRequest());
    dispatch(activePromoUpdate());
  }, [searchValue]);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  // Setting the initial language value
  useEffect(() => {
    dispatch(langInitialization(i18n.language));
  }, []);

  return (
    <HeaderView
      onValidateSearch={onValidateSearch}
    />    
  );
}

export default Header;
