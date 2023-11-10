import { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs,query, orderBy  } from 'firebase/firestore'
import firebaseConfig from './FirebaseConfig'; //my key and info
import MainPage from "./Mainpage";
import Navabar from "./Navbar";
import Footer from './Footer';
import Tags from './Tags';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import Contact from './Contact';
import About from './About';

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const getBlogs = query(collection(db, 'blogs') ,orderBy('id', 'asc'))

function App() {

  const [blogsData, setBlogsData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const [modeChanger, setModeChange] = useState(() => {
    // a function to initialize state from localStorage
    return JSON.parse(localStorage.getItem('modeChanger')) || false;
  });

  const [commentsTrigger, setCommentsTrigger] = useState(false)

  const triggerRefetch = () => {
    setCommentsTrigger(!commentsTrigger); // Toggle the trigger state to force a re-fetch
  };

  useEffect(() => {

    //fetching the data from firebase
    getDocs(getBlogs)
    .then(snapshot => {

      let shots = []

      snapshot.docs.forEach(doc => {
        shots.push({ ...doc.data(), id: doc.id })
      })

      setBlogsData(shots)

      // I know that i should never do that but i found a realy cool loading gif and i want everyone to see it
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
  
    })
    .catch(err => {
      console.log(err.message)
      setIsLoading(false);
    })
  }, [commentsTrigger]);


  return (
    <Router>
      <div className="App">
        <div className="content">
          {/*Making the navabar visible on all pages*/}
          <Navabar modeChanger={modeChanger} setModeChange={setModeChange} />
          {/*if its still fetching the data shwoing a cool loading gif*/}
          {isLoading ? (
              <div className="loading">
                <img src={require(`./images/loading-cat.gif`)} alt="" loading='lazy'/>
              </div>
          )
          :
          <Routes>
            {blogsData && <Route exact path='/' element={<MainPage blogsData={blogsData} />} />}
            <Route path='/Contact' element={<Contact />} />
            {blogsData && <Route path='/blog/:blogTitle' element={<BlogDetails modeChanger={modeChanger} blogsData={blogsData} db={db} triggerRefetch={triggerRefetch} />} />}
            {blogsData && <Route path='/tag/:clickedTag' element={<Tags blogsData={blogsData} />} />}
            <Route path="/About-Me" element={<About />} />
            {/*a not found page to work on all paths that doesnt exist withing the routes*/}
            <Route path="/*" element={<NotFound />} />
          </Routes>}
          {/*Making the footer visible on all pages*/}
          <Footer/>
        </div>
      </div>
    </Router>
  );
}

export default App;