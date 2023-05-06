import { useTranslation } from 'react-i18next';
import PromoContent from './PromoContent';
import './sass/Promo.scss';

function Promo() {
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
        <PromoContent />
      </div>
    </div>
  );
}

export default Promo;
