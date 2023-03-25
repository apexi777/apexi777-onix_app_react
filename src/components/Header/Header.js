import { useState } from 'react';
import PropTypes from 'prop-types';

import withHeaderView from './WithHeaderView';
import HeaderView from './HeaderView';

const WithHeaderView = withHeaderView(HeaderView);

function Header({ onUpdateSearch }) {
  const [menuItems] = useState([
    { name: 'Men', action: true, id: 101 },
    { name: 'Women', action: false, id: 102 },
    { name: 'Kids', action: false, id: 103 },
    { name: 'Customise', action: false, id: 104 }
  ]);

  // Intermediate values search data
  const [terminate, setTerminate] = useState('');

  // Sending the search data to the parent component
  const onValidateSearch = (e) => {
    const value = e.target.value.replace(/[^A-Za-z0-9]/, '');
    setTerminate(value);
    onUpdateSearch(value);
  };

  return (
    <WithHeaderView
      menuItems={menuItems}
      onValidateSearch={onValidateSearch}
      terminate={terminate}
    />    
  );
}

Header.propTypes = {
  onUpdateSearch: PropTypes.func.isRequired,
};

export default Header;
