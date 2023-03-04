import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import '../../style/style.scss';

function NotFound() {
  return (
    <div className="page_404">
      <Helmet>
        <title>Nike - This Page Not Found</title>
      </Helmet>
      <p className="page_404__message">Page doesn&apos;t exist</p>
      <Link className="page_404__link" to="/">Click to back to main page</Link>
    </div>
  );
}

export default NotFound;
