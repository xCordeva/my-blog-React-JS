import { useParams, Link, useLocation } from "react-router-dom";
import { useState, useEffect, } from 'react';
import './Tags.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { generateUrl, blogsFormatTimestamp } from "./Blogs";


const Tags = ({blogsData}) => {

    const [rerender, setRerender] = useState(false);

    const location = useLocation();

    useEffect(() => {
      // Reset the scroll position when the location changes
      window.scrollTo(0, 0);
    }, [location]);

    const {clickedTag} = useParams()

    //Tried to reuse code from blog.js by creating a custom hook, didnt work well, so here i am copyinng the code
    const [visibleBlogCount, setVisibleBlogCount] = useState(0);

    useEffect(() => {
        setVisibleBlogCount(0)
        const blogElements = document.querySelectorAll('.blog-tagged');

        // effect to show blogs when scrolling 
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show-tagged');
              // counting how many blogs are shown
              setVisibleBlogCount((prevCount) => prevCount + 1);
            }
          });
        });
    
        blogElements.forEach((elem) => observer.observe(elem));
    
        return () => {
          blogElements.forEach((elem) => observer.unobserve(elem));
        };
    }, [rerender]);
    
    useEffect(() => {
        const itemsLoaded = document.querySelector('.all-loaded-container-tagged')
        let blogsCount = 0;
        blogsData.map((blog)=>(
            blog.tags.map((tag)=>(
                tag === clickedTag ? blogsCount++ : null
            ))
        ))
        // if all blogs are shown display the message
        if (visibleBlogCount === blogsCount) {
            
            itemsLoaded.classList.add('show-all-loaded-tagged')
            setTimeout(()=>{
                itemsLoaded.classList.remove('show-all-loaded-tagged')
            }, 2500)
        }
    }, [rerender, visibleBlogCount, blogsData]);

    let tagsAdded = []

    
    const tagsCount = {};
    const countTags = () => {
        blogsData.forEach((blog) => {
          blog.tags.forEach((tag) => {
            if(tagsCount[tag]){
              tagsCount[tag]++;
            }
            else{
              tagsCount[tag] = 1;
            }
          })
        })
    };
    countTags()

    return (
        <div className="tags-page">
            <div className="blogs-tagged">
                <h1>You're Currently on <span>{clickedTag}</span> Page</h1>
                {blogsData.map((blog)=>(
                    blog.tags.map((tag)=>(
                        tag === clickedTag ? 
                        <div className="blog-tagged" key={blog.id}>
                            <Link to={`/blog/${generateUrl(blog.title)}`}>
                            <div className="side-blog" key={blog.id}>
                                    <img src={require(`${blog.image}`)} alt="" loading='lazy'/>
                                    <div className="side-blog-title-date">
                                        <h3>{blog.title}</h3>
                                        <p>{blogsFormatTimestamp(blog.createdAt)}</p>
                                    </div>
                                    <div className="time-to-read">
                                        <FontAwesomeIcon icon={faClock} style={{color: "black", width: '15px'}} />
                                        <p>A {blog.timeToRead} Read</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        :
                        ``
                    ))
                    
                ))}
                <div className="all-loaded-container-tagged">
                    <div className="all-loaded">
                        <p>All Posts Loaded</p>
                    </div>
                </div>
            </div>
            <div className="line"></div>
            <div className="tags-container">
                <h1>More Tags</h1>
                {blogsData.map((blog) => (
                    blog.tags.map((tag) => {
                        if(!tagsAdded.includes(tag) && tag !== clickedTag ){
                            tagsAdded.push(tag) 
                            return <Link to={`/tag/${tag}`} onClick={()=>setRerender(!rerender)}>

                                <div className="tag-container" key={tag}>
                                    <div className="tag-name">
                                    {tag}
                                    </div>
                                    <div className="tag-info">
                                        {tagsCount[tag]} Articles
                                    </div>
                                </div>
                                
                                </Link>
                        }
                        return null
                    })
                ))}
            </div>
        </div>
    );
}

export default Tags;