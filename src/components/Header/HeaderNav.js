// Підключення бібліотек
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

function HeaderNav({ name }) {
  const { t } = useTranslation();
  return (
    <li>
      <NavLink 
        className={({ isActive }) => `menu_item${isActive ? ' active_item' : ''}`}
        end 
        to={(name === 'Men') ? '/' : name.toLowerCase()}
      >
        {t(`header.nav.${name}`)}
      </NavLink>
            
    </li>
  );
}

HeaderNav.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HeaderNav;
