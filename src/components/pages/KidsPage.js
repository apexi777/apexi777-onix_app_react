
import loading_img from "../../resources/icons/loading.gif"
import { Helmet } from "react-helmet";

const KidsPage = () => {
    return(
        <div style={{display: "flex", justifyContent: "center", margin: "20vh"}}>
                <Helmet>
                    <meta name="description" content="Nike - Kids Page" />
                    <title>Nike - Kids Page</title>
                </Helmet>
            <img src={loading_img} alt="loading" />
        </div>
    )
}

export default KidsPage;