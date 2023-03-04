import PropTypes from 'prop-types';

import logo from '../../assets/icons/logo.png';
import buy from '../../assets/icons/buy-icon.png';
import search from '../../assets/icons/search-icon.png';

function HeaderView({
  menuElement, onShowNavMenu, terminate, onValidateSearch, classMenu 
}) {
  return (
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
        <ul className={classMenu}>
          {menuElement}
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
  );
}

HeaderView.propTypes = {
  onValidateSearch: PropTypes.func.isRequired,
  menuElement: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onShowNavMenu: PropTypes.func.isRequired,
  terminate: PropTypes.string.isRequired,
  classMenu: PropTypes.string.isRequired
};

export default HeaderView;
