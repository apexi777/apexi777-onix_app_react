import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import PromoContent from './PromoContent';

function PromoView({ updateLoading, loaded }) {
  const { t } = useTranslation();
  return (
    <div className="promo">
      <div className="container">
        <div className="promo_block">
          <div className="promo_block_header">
            {t('promo.title')}
          </div>
          <div className="promo_block_subheader">
            {t('promo.subtitle')}
          </div>
        </div>
        <PromoContent 
          loaded={loaded}
          updateLoading={updateLoading}
        />
      </div>
    </div>
  );
}

PromoView.propTypes = {
  updateLoading: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired
};

export default PromoView;
