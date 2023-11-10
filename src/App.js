import { useState,useEffect } from 'react';
import MainPage from "./Mainpage";
import Navabar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs,query, orderBy  } from 'firebase/firestore'
import firebaseConfig from './FirebaseConfig'; //my key and info
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
    })
    .catch(err => {
      console.log(err.message)
    })
  }, [commentsTrigger]);


  return (
    <Router>
      <div className="App">
        <div className="content">
        <Navabar modeChanger={modeChanger} setModeChange={setModeChange} />
        <Routes>
          {blogsData && <Route exact path='/' element={<MainPage blogsData={blogsData}/>} /> }
          <Route path='/Contact' element={<Contact/>} />
          {blogsData && <Route path='/blog/:blogTitle' element={<BlogDetails modeChanger={modeChanger} blogsData={blogsData} db={db} triggerRefetch={triggerRefetch}/>} /> }
          {blogsData && <Route path='/tag/:clickedTag' element={<Tags blogsData={blogsData}/>} /> }
          <Route path="/About-Me" element={<About />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer/>
        </div>
      </div>
    </Router>
  );
}

export default App;
