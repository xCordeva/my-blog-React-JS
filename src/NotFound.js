import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
    const location = useLocation()
    return (
        <div className="not-found">
            {/* Checking if its thet portofolio page to put on a different message */}
            {location.pathname === '/my-blog-React-JS/Portfolio' ? 
            <div className="not-found-portfolio">
                <h1>oops 404! portofolio not found, I am too lazy to create it but its coming soon..hopefully</h1>
                <p>Page Not Found</p>
                <Link to={'/my-blog-React-JS/'}>Back To Home Page</Link>
            </div> 
            :
            <div className="not-found">
                <h1>oops! 404</h1>
                <p>Page Not Found</p>
                <Link to={'/my-blog-React-JS/'}>Back To Home Page</Link>
            </div>}
        </div>
        
    );
}
 
export default NotFound;