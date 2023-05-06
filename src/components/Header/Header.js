import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { 
  searchUpdate, 
  searchRequest,
  activePromoUpdate
} from '../../store/slice/data';
import { langInitialization } from '../../store/slice/header';
import HeaderView from './HeaderView';

function Header() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.shoes.searchValue);
  const lang = useSelector((state) => state.header.lang);

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
