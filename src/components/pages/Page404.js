import { Helmet } from "react-helmet";
import { Link } from "react-router-dom"
import '../../style/style.scss';

const Page404 = () => {
    return (
        <div className="page_404">
                <Helmet>
                    <title>Nike - error page</title>
                </Helmet>
            <p className="page_404__message">Page doesn't exist</p>
            <Link className="page_404__link" to="/">Click to back to main page</Link>
        </div>
    )
}

export default Page404;