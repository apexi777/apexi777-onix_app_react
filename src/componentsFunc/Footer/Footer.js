import { useTranslation } from 'react-i18next';
import './sass/Footer.scss';

function Footer() {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <div className="footer_names">
        <a 
          className="footer_name"
          href="https://github.com/apexi777" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          {t('footer.layout')}
        </a>
        <a 
          className="footer_name" 
          href="https://www.figma.com/community/file/1174441964275136004" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          {t('footer.designed')}
        </a>
      </div>
    </div>
  );
}

export default Footer;
