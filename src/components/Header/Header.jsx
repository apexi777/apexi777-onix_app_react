import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

import HeaderView from './HeaderView';
import HeaderNav from './HeaderNav';
import './sass/Header.scss';

function Header({ onUpdateSearch }) {
  const [menuItems] = useState([
    { name: 'Men', action: true, id: 101 },
    { name: 'Women', action: false, id: 102 },
    { name: 'Kids', action: false, id: 103 },
    { name: 'Customise', action: false, id: 104 }
  ]);

  const [classMenu, setClassMenu] = useState('menu');

  // Intermediate values search data
  const [terminate, setTerminate] = useState('');

  // Sending the search data to the parent component
  const onValidateSearch = (e) => {
    const value = e.target.value.replace(/[^A-Za-z0-9]/, '');
    setTerminate(value);
    onUpdateSearch(value);
  };

  const onShowNavMenu = () => {
    if (classMenu === 'menu') setClassMenu('menu acivity');
    else setClassMenu('menu');
  };

  // Forming navigation menu elements
  const menuElement = menuItems.map((element) => {
    const { name, id } = element;
    return (
      <HeaderNav 
        key={id}
        name={name}
      />
    );
  });

  return (
    <header className="header">
      <HeaderView
        menuElement={menuElement}
        onShowNavMenu={onShowNavMenu}
        onValidateSearch={onValidateSearch}
        terminate={terminate}
        classMenu={classMenu}
      />
      <Outlet />
    </header>
  );
}

Header.propTypes = {
  onUpdateSearch: PropTypes.func.isRequired,
};

export default Header;
