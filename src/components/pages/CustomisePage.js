import { Helmet } from "react-helmet";
import loading_img from "../../resources/icons/loading.gif"


const CustomisePage = () => {
    return(
        <div style={{display: "flex", justifyContent: "center", margin: "20vh"}}>
                <Helmet>
                    <meta name="description" content="Nike - Customise Page" />
                    <title>Nike - Customise Page</title>
                </Helmet>
            <img src={loading_img} alt="loading" />
        </div>
    )
}

export default CustomisePage;