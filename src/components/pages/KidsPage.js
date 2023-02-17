
import loading_img from "../../assets/icons/loading.gif"
import { Helmet } from "react-helmet";
import '../../style/style.scss';

const KidsPage = () => {
    return(
        <div className="pages">
                <Helmet>
                    <meta name="description" content="Nike - Kids Page" />
                    <title>Nike - Kids Page</title>
                </Helmet>
            <img src={loading_img} alt="loading" />
        </div>
    )
}

export default KidsPage;