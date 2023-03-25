import { useState } from 'react';
import PropTypes from 'prop-types';

function withHeaderView(BaseComponent) {
  return function view({
    menuItems, terminate, onValidateSearch,
  }) {
    const [classMenu, setClassMenu] = useState(false);

    const onShowNavMenu = () => {
      setClassMenu((prevClassMenu) => !prevClassMenu);
    };
    return (
      <BaseComponent
        menuItems={menuItems}
        onShowNavMenu={onShowNavMenu}
        onValidateSearch={onValidateSearch}
        terminate={terminate}
        classMenu={classMenu}
      />
    );
  };
}

withHeaderView.propTypes = {
  onValidateSearch: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  terminate: PropTypes.string.isRequired,
};

export default withHeaderView;
