import './sass/Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <div className="footer_names">
        <a 
          className="footer_name"
          href="https://github.com/apexi777" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Layout by Andrey Babich
        </a>
        <a 
          className="footer_name" 
          href="https://www.figma.com/community/file/1174441964275136004" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Designed By Nanda
        </a>
      </div>
    </div>
  );
}

export default Footer;
