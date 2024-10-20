import "./Mainpage.css";
import Blogs, { generateUrl } from "./Blogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const MainPage = ({ blogsData }) => {
  return (
    <div className="main">
      {blogsData.map((blog) =>
        blog.featured ? (
          <div className="featured-post" key={blog.id}>
            <img src={`${blog.image}`} alt="" />
            <div className="shade"></div>
            <div className="featured-post-details">
              <div className="featured">
                <h1>Featured Post</h1>
                <img src={require(`${`./images/fire.gif`}`)} alt="Fire GIF" />
              </div>
              <h1>{blog.title}</h1>
              <Link to={`/blog/${generateUrl(blog.title)}`}>
                <div className="read-more-button">
                  <button>READ MORE</button>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "#FFF" }}
                  />
                </div>
              </Link>
            </div>
          </div>
        ) : (
          ``
        )
      )}
      <Blogs blogsData={blogsData} />
    </div>
  );
};

export default MainPage;
