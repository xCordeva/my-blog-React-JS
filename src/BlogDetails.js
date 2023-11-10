import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import './BlogDetails.css';
import { generateUrl,blogsFormatTimestamp } from "./Blogs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock,faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { format, isToday, isYesterday, isThisYear,formatDistanceToNow } from 'date-fns';
import ShareButtons from "./ShareButtons";

const BlogPage = ({blogsData, modeChanger, db, triggerRefetch}) => {

    const currentUrl = window.location.href;
    const location = useLocation();
    console.log(currentUrl)
    useEffect(() => {
      // Reset the scroll position when the location changes
      window.scrollTo(0, 0);
    }, [location]);

    const {blogTitle} = useParams()
    const blogDetails = blogsData.find((blog)=> generateUrl(blog.title) === blogTitle)

    // adding a counter to render only 2 blogs on the sidebar, can do it with the index but the number would be affected depending on the index of the blog we're on 
    let renderedBlogs = 0;

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const submitComment = (e) => {

        e.preventDefault();
    
        const newComment = {
            ...blogDetails,
            comments: [...blogDetails.comments,
                {
                    id: (blogDetails.comments.length + 2),
                    name,
                    title,
                    content,
                    createdAt: Timestamp.now(),

                }
            ]
            
        };
        const docRef = doc(db, 'blogs', blogDetails.id);
        setDoc(docRef, newComment)
        // to trigger a re-fetch of comments.
        // addNewComment();
        setContent('');
        setTitle('');
        setName('');
        triggerRefetch()
    }

    function commentsFormatTimestamp(createdAt){
        if(createdAt && createdAt.toDate){
            const createdAtDate = createdAt.toDate();

            if(isToday(createdAtDate)){
                return formatDistanceToNow(createdAtDate, { addSuffix: true });
            }
            else if(isYesterday(createdAtDate)){
                return 'Yesterday . ' + format(createdAtDate, "hh:mma");
            }
            else if(isThisYear(createdAtDate)){
                return format(createdAtDate, "d, MMMM . hh:mma");
            }
            else{
                return format(createdAtDate, "d, MMMM y");
            }
        }
        else{
            return 'Invalid Timestamp';
        }
    }


    return (

        <div className="blog-page">
            <div className="blog-main">
                <img src={require(`${`./images/dowdnload.jpg`}`)} alt="" />
                <div className="blog-shade"></div>
                <div className="blog-main-details">
                    <div className="tags">
                        {blogDetails.tags.map((tag)=>(
                            <Link to={`/tag/${tag}`} >
                                <p className='tag' key={tag}>{tag}</p>
                            </Link>
                        ))}
                    </div>
                    <h1>{blogDetails.title}</h1>
                </div>
            </div>
            <div className="blog-page-content">
                <div className="left-side blog-content">
                    <p>{blogDetails.content}</p>
                    <ShareButtons blogUrl={currentUrl} blogTitle={blogDetails.title}/>
                    <div className="line"></div>
                    <div className="comments">
                        {blogDetails.comments.length === 0 ? `` : <h1>Comments Section</h1>}
                        {blogDetails.comments.map((comment)=>(
                            <div className="comment">
                                <div className="comment-left-side">
                                    <img src={modeChanger ? require(`${`./images/user-dark.png`}`) : require(`${`./images/user-light.png`}`)} alt="" />
                                    <h3>{comment.name || 'UNKNOWN'}</h3>
                                </div>
                                <div className="comment-right-side">
                                    <div className="comment-body-title-date">
                                        <h3>{comment.title || 'UNTITLED'}</h3>
                                        <p>{commentsFormatTimestamp(comment.createdAt)}</p>
                                    </div>
                                    <p>{comment.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="add-comment">
                        <h1>Add A Comment</h1>
                        <form className="add-comment-form" onSubmit={submitComment}>
                            <input
                            placeholder="Your Name..."
                            onChange={(e)=> setName(e.target.value)}
                            value={name}
                            ></input>
                            <input
                            placeholder="Title..."
                            onChange={(e)=> setTitle(e.target.value)}
                            value={title}
                            ></input>
                            <textarea 
                            required
                            placeholder='Add a comment...'
                            onChange={(e)=> setContent(e.target.value)}
                            value={content}
                            ></textarea>
                            <div className="leave-a-comment">
                                <button><span>LEAVE A COMMENT</span>
                                <FontAwesomeIcon icon={faPaperPlane} style={{color: "#ffffff",}} /></button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="right-side">
                    <h1>Read More</h1>
                    <div className="blog-sidebar">
                        {blogsData.map((blog) => {

                            if(renderedBlogs < 2 && blog.id !== blogDetails.id){
                            renderedBlogs++; // Increment the counter
                            return (
                                <Link to={`/blog/${generateUrl(blog.title)}`}>
                                <div className="side-blog" key={blog.id}>
                                    <img src={require(`${blog.image}`)} alt="" loading='lazy'/>
                                    <div className="side-blog-title-date">
                                        <h5>{blog.title}</h5>
                                        <p>{blogsFormatTimestamp(blog.createdAt)}</p>
                                    </div>
                                    <div className="time-to-read">
                                        <FontAwesomeIcon icon={faClock} style={{color: "black", width: '15px'}} />
                                        <p>A {blog.timeToRead} Read</p>
                                    </div>
                                </div>
                                </Link>
                            );
                            }
                            return null;
                        })}
                        
                    </div>
                </div>
                
            </div>
        </div>

    );
}
 
export default BlogPage;