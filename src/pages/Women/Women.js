import { Helmet } from 'react-helmet';
import loadingImg from '../../assets/icons/loading.gif';

import '../../style/style.scss';

function Women() {
  return (
    <div className="pages">
      <Helmet>
        <meta name="description" content="Nike - Women Page" />
        <title>Nike - Women Page</title>
      </Helmet>
      <img src={loadingImg} alt="loading" />
    </div>
  );
}

export default Women;
