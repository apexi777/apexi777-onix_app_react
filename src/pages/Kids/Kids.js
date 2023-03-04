import { Helmet } from 'react-helmet';
import loadingImg from '../../assets/icons/loading.gif';
import '../../style/style.scss';

function Kids() {
  return (
    <div className="pages">
      <Helmet>
        <meta name="description" content="Nike - Kids Page" />
        <title>Nike - Kids Page</title>
      </Helmet>
      <img src={loadingImg} alt="loading" />
    </div>
  );
}

export default Kids;
