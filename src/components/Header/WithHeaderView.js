import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

function withHeaderView(BaseComponent) {
  return function view({
    onValidateSearch
  }) {
    const [classMenu, setClassMenu] = useState(false);

    const onShowNavMenu = useCallback(() => {
      setClassMenu((prevClassMenu) => !prevClassMenu);
    }, [classMenu]);
    return (
      <BaseComponent
        onShowNavMenu={onShowNavMenu}
        onValidateSearch={onValidateSearch}
        classMenu={classMenu}
      />
    );
  };
}

withHeaderView.propTypes = {
  onValidateSearch: PropTypes.func.isRequired,
};

export default withHeaderView;
