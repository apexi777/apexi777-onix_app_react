import { Helmet } from "react-helmet";
import loading_img from "../../resources/icons/loading.gif"


const WomenPage = () => {
    return(
        <div style={{display: "flex", justifyContent: "center", margin: "20vh"}}>
                <Helmet>
                    <meta name="description" content="Nike - Women Page" />
                    <title>Nike - Women Page</title>
                </Helmet>
            <img src={loading_img} alt="loading" />
        </div>
    )
}

export default WomenPage;