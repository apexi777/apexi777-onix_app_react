import { Helmet } from 'react-helmet';
import loadingImg from '../../assets/icons/loading.gif';

import '../../style/style.scss';

function Customise() {
  return (
    <div className="pages">
      <Helmet>
        <meta name="description" content="Nike - Customise Page" />
        <title>Nike - Customise Page</title>
      </Helmet>
      <img src={loadingImg} alt="loading" />
    </div>
  );
}

export default Customise;
