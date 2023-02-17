import { Helmet } from "react-helmet";
import loading_img from "../../assets/icons/loading.gif"
import '../../style/style.scss';

const CustomisePage = () => {
    return(
        <div className="pages">
                <Helmet>
                    <meta name="description" content="Nike - Customise Page" />
                    <title>Nike - Customise Page</title>
                </Helmet>
            <img src={loading_img} alt="loading" />
        </div>
    )
}

export default CustomisePage;