import './Blogs.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { format, isToday, isYesterday, isThisYear } from 'date-fns';

export function generateUrl(blogTitle) {
    return blogTitle
      .toLowerCase() // Convert to lowercase
      .replace(/[!]/g, '') // Remove exclamation marks (!)
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, '') // Remove any other special characters
      .replace(/-+/g, '-') // Remove consecutive hyphens
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

export function blogsFormatTimestamp(createdAt) {
    if (createdAt && createdAt.toDate) {
      const createdAtDate = createdAt.toDate();
  
      if (isToday(createdAtDate)) {
        return 'Today';
      } else if (isYesterday(createdAtDate)) {
        return 'Yesterday';
      } else if (isThisYear(createdAtDate)) {
        // Format the date as "dddd D, MMMM" (e.g., "Monday 29, October")
        return format(createdAtDate, 'eeee d, MMMM');
      } else {
        // Format the date as "dddd D, MMMM YYYY" (e.g., "Monday 29, October 2023")
        return format(createdAtDate, 'eeee d, MMMM yyyy');
      }
    } else {
      return 'Invalid Timestamp';
    }
}

const Blogs = ({blogsData}) => {

    const [visibleBlogCount, setVisibleBlogCount] = useState(0);

    useEffect(() => {

        const blogElements = document.querySelectorAll('.blog');

        // effect to show blogs when scrolling 
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show');
              // counting how many blogs are shown
              setVisibleBlogCount((prevCount) => prevCount + 1);
            }
          });
        });
    
        blogElements.forEach((elem) => observer.observe(elem));
    
        return () => {
          blogElements.forEach((elem) => observer.unobserve(elem));
        };
    }, []);
    
    useEffect(() => {
        const itemsLoaded = document.querySelector('.all-loaded-container')
        // if all blogs are shown display the message
        if (visibleBlogCount === blogsData.length) {
            
            itemsLoaded.classList.add('show-all-loaded')
            setTimeout(()=>{
                itemsLoaded.classList.remove('show-all-loaded')
            }, 2500)
        }
    }, [visibleBlogCount, blogsData]);

    // a standaed grid layout to start with, this works on desktop
    const [gridAreas, setGridAreas] = useState([
        '1 / 1 / 2 / 3',
        '1 / 3 / 2 / 4',
        '1 / 4 / 2 / 5',
        '2 / 1 / 3 / 2',
        '2 / 2 / 3 / 4',
        '2 / 4 / 3 / 5',
        '3 / 1 / 4 / 3',
        '3 / 3 / 4 / 5',
        '4 / 1 / 5 / 2',
        '4 / 2 / 5 / 3',
        '4 / 3 / 5 / 5',
    ])        

    const handleResize = () => {

        const windowWidth = window.outerWidth;

        let newGridAreas = [...gridAreas]; // Create a copy of the current state
        
        // checking for window size and based on it generating a new grid layout
        if (windowWidth <= 1200 && windowWidth > 910) {
            newGridAreas = [
                '1 / 1 / 2 / 3',
                '1 / 3 / 2 / 4',
                '2 / 1 / 3 / 2',
                '2 / 2 / 3 / 4',
                '3 / 1 / 4 / 3',
                '3 / 3 / 4 / 4',
                '4 / 1 / 5 / 2',
                '4 / 2 / 5 / 3',
                '4 / 3 / 5 / 4',
            ];
        }
        else if(windowWidth <= 910 && windowWidth > 605){
            newGridAreas = [
                '1 / 1 / 2 / 3',
                '2 / 1 / 3 / 2',
                '2 / 2 / 3 / 3',
                '3 / 1 / 4 / 3',
                '4 / 1 / 5 / 2',
                '4 / 2 / 5 / 3',
            ];

        }
        else if(windowWidth <= 605){
            newGridAreas = [
                '1 / 1 / 2 / 2',
                '2 / 1 / 3 / 2',
                '3 / 1 / 4 / 2',
                '4 / 1 / 5 / 2',
            ];
        }

        setGridAreas(newGridAreas);

    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        // Call the resize handler once to set the initial gridAreas
        handleResize();

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [blogsData]);
    
    // producing grid areas until we reach the end of the blogs
    // i created this pattern using a grid generatore, it wasnt possible to be created only using css, following the pattern every 4 rows the numbers of rows are increased and repeated, while the columns stay the same 
    for(let index = 0; gridAreas.length < blogsData.length; index++){
        gridAreas.push(`${Number(gridAreas[index].split(' / ')[0].split(' ')) + 4} / ${Number(gridAreas[index].split(' / ')[1].split(' '))} / ${Number(gridAreas[index].split(' / ')[2].split(' ')) + 4} / ${Number(gridAreas[index].split(' / ')[3].split(' '))}`)
    }


    blogsData.forEach((blog, index) => {
        // This operation ensures that the value of gridAreaIndex remains within the range of 0 to gridAreas.length - 1. When index is less than gridAreas.length, the result is equal to index. When index becomes greater than or equal to gridAreas.length, it wraps back to 0, starting the cycle over.
        const gridAreaIndex = index % gridAreas.length;
        blog.gridArea = gridAreas[gridAreaIndex];

    });

  
    return (
        <div className="blogs-area">
            <div className="blogs">

                {blogsData.map((blog)=>(
                        <div className="blog hidden" key={blog.id} style={{gridArea : `${blog.gridArea}` }}>
                            <Link to={`/blog/${generateUrl(blog.title)}`}>
                            <img src={require(`${blog.image}`)} alt="" loading='lazy'/>
                            
                            <div className="tags">
                                {blog.tags.map((tag)=>(
                                    <Link to={`/tag/${tag}`}>
                                        <p className='tag' key={tag}>{tag}</p>
                                    </Link>
                                ))}
                            </div>
                            
                            <div className="blog-details">
                                    <h3>{blog.title}</h3>
                                <div className="date-time-container">
                                    <p>{blogsFormatTimestamp(blog.createdAt)}</p>
                                    <div className="time-to-read">
                                        <FontAwesomeIcon icon={faClock} style={{color: "grey", width: '15px'}} />
                                        <p>A {blog.timeToRead} Read</p>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </div>
                ))}
                
            </div>

            <div className="all-loaded-container">
                <div className="all-loaded">
                    <p>All Posts Loaded</p>
                </div>
            </div>
            
        </div>
    );
}
 
export default Blogs