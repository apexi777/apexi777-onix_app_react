import { Helmet } from "react-helmet";
import loading_img from "../../assets/icons/loading.gif"
import '../../style/style.scss';

const WomenPage = () => {
    return(
        <div className="pages">
                <Helmet>
                    <meta name="description" content="Nike - Women Page" />
                    <title>Nike - Women Page</title>
                </Helmet>
            <img src={loading_img} alt="loading" />
        </div>
    )
}

export default WomenPage;