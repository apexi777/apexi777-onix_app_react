import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import withHeaderView from './WithHeaderView';
import HeaderNav from './HeaderNav';

import logo from '../../assets/icons/logo.png';
import buy from '../../assets/icons/buy-icon.png';
import search from '../../assets/icons/search-icon.png';

import './sass/Header.scss';

function HeaderView({
  menuItems, onShowNavMenu, terminate, onValidateSearch, classMenu 
}) {
  const { t, i18n } = useTranslation();

  const [lang, setLang] = useState('');

  useEffect(() => {
    setLang(i18n.language);
  }, []);

  const onChangeLang = useCallback((e) => {
    const target = e.currentTarget.value;
    if (target !== lang) {
      setLang(target);
      i18n.changeLanguage(target);
    }
  }, [lang]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__logo">
          <p className="header__logo_title">
            nike
          </p>
          <img className="header__logo_icon" src={logo} alt="logo" />
        </div>
        <nav className="header__nav">
          <div 
            onClick={onShowNavMenu}
            aria-hidden="true"
            className="header__nav_btn"
          />
          <ul className={`menu ${classMenu ? 'activity' : ''}`}>
            {
            menuItems.map(({ name, id }) => (
              <HeaderNav 
                key={id}
                name={name}
              />
            ))
            }
            <form className="menu_search" action="#">
              <input 
                onChange={onValidateSearch} 
                value={terminate} 
                placeholder={t('header.search.placeholder')} 
                type="text" 
                className="menu_search_input"
              />
              <input 
                onClick={(e) => { e.preventDefault(); }} 
                className="menu_search_submit" 
                type="image" 
                alt="submit" 
                src={search}
              />
            </form>
            <div className="menu_buy">
              <a onClick={(e) => { e.preventDefault(); }} href="#top">
                <img src={buy} alt="buy_icon" />
              </a>
            </div>
            <div className="menu_lang">
              <label htmlFor="english">
                {t('header.lang.en')}
                <input 
                  type="radio" 
                  id="english"
                  name="en"
                  value="en"
                  className="menu_lang_input"
                  checked={lang === 'en'}
                  onChange={onChangeLang}
                />
              </label>
              <label htmlFor="ukraine">
                {t('header.lang.ua')}
                <input 
                  type="radio" 
                  id="ukraine"
                  name="ua"
                  value="ua"
                  className="menu_lang_input"
                  checked={lang === 'ua'}
                  onChange={onChangeLang}
                />
              </label>

            </div>
          </ul>
        </nav>
      </div>
      <Outlet />
    </header>
  );
}

HeaderView.propTypes = {
  onValidateSearch: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.bool,
    id: PropTypes.number,
    name: PropTypes.string
  })).isRequired,
  onShowNavMenu: PropTypes.func.isRequired,
  terminate: PropTypes.string.isRequired,
  classMenu: PropTypes.bool.isRequired
};

export default withHeaderView(HeaderView);
