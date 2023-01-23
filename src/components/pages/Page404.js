import { Helmet } from "react-helmet";
import { Link } from "react-router-dom"

const Page404 = () => {
    return (
        <div style={{'color' : 'white'}} className="Page404">
                <Helmet>
                    <title>Nike - error page</title>
                </Helmet>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30vh'}}>Page doesn't exist</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px', 'marginBottom': '20vh'}} to="/">Click to back to main page</Link>
        </div>
    )
}

export default Page404;