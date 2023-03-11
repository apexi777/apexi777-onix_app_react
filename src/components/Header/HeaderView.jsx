import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

import HeaderNav from './HeaderNav';

import logo from '../../assets/icons/logo.png';
import buy from '../../assets/icons/buy-icon.png';
import search from '../../assets/icons/search-icon.png';

import './sass/Header.scss';

function HeaderView({
  menuItems, onShowNavMenu, terminate, onValidateSearch, classMenu 
}) {
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
            onTouchStart={onShowNavMenu}
            className="header__nav_btn"
          />
          <ul className={`menu ${classMenu ? 'activity' : ''}`}>
            {
            menuItems.map((element) => {
              const { name, id } = element;
              return (
                <HeaderNav 
                  key={id}
                  name={name}
                />
              );
            })
            }
            <form className="menu_search" action="#">
              <input 
                onChange={onValidateSearch} 
                value={terminate} 
                placeholder="Search" 
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
          </ul>
        </nav>
      </div>
      <Outlet />
    </header>
  );
}

HeaderView.propTypes = {
  onValidateSearch: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onShowNavMenu: PropTypes.func.isRequired,
  terminate: PropTypes.string.isRequired,
  classMenu: PropTypes.bool.isRequired
};

export default HeaderView;
