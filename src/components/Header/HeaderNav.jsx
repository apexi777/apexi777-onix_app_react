import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// Navigation menu component from header
function HeaderNav({ name }) {
  const path = ((name === 'Men') ? '/' : name).toLowerCase();

  return (
    <li>
      <NavLink 
        className={({ isActive }) => `menu_item${isActive ? ' active_item' : ''}`}
        end 
        to={path}
      >
        {name}
      </NavLink>
            
    </li>
  );
}

HeaderNav.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HeaderNav;
