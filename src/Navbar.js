import { Link, useLocation } from "react-router-dom";
import './Navbar.css';
import './glitch.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'

const Navabar = ({modeChanger, setModeChange}) => {

    const location = useLocation();

    const [isTransparent, setTransparent] = useState(false);

    const modeHandler= ()=>{
        setModeChange(!modeChanger)
        localStorage.setItem('modeChanger', JSON.stringify(modeChanger))
        document.body.classList.toggle('light-mode', modeChanger);
    }
    // toggling through modes based on the user previous choice
    useEffect(() => {
      if (!modeChanger) {
        document.body.classList.add('light-mode');
      } else {
        document.body.classList.remove('light-mode');
      }
  
      // storing modeChanger in localStorage
      localStorage.setItem('modeChanger', JSON.stringify(modeChanger));
    }, [modeChanger]);

    useEffect(() => {
        // Function to handle scroll event
        const handleScroll = () => {
          if(window.scrollY > 0){
            setTransparent(true);
          }
          else{
            setTransparent(false);
          }
        };
        
        // Add scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);
    
        // Remove scroll event listener when the component unmounts
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [menuClicked, setMenuClicked] = useState(false)
    
    const mobileMenuClicked = ()=>{
      setMenuClicked(!menuClicked)
    }

    const closeMenuClicked = ()=>{
      setMenuClicked(!menuClicked)
    }

    return (
      <div className='nav-container' >
        <div className={`nav-bar ${isTransparent ? 'transparent' : ''}`}>
          
          <div className="nav-left-side hero-container">
            <Link to='/'>
              <h2 className="hero glitch layers" data-text="The Cordeva Blog"><span>The Cordeva Blog</span></h2>
            </Link>
          </div>
          <div className="nav-right-side">
              <div className="desktop-menu">
                <Link to='/' className={location.pathname === '/' ? 'current-page' : 'not-current-page'} >Home</Link>
                <Link to='/Portfolio' className={location.pathname === '/Portfolio' ? 'current-page' : 'not-current-page'}>My Portfolio</Link>
                <Link to='/About-Me'className={location.pathname === '/About-Me' ? 'current-page' : 'not-current-page'}>About Me</Link>
                <Link to='/Contact'className={location.pathname === '/Contact' ? 'current-page' : 'not-current-page'}>Contact</Link>
                <div className="dark-light-mode" onClick={()=>modeHandler()}>
                    <p>{modeChanger ? `Light Mode` : `Dark Mode`}</p>
                    <i className="mode-icon">
                        <img src={modeChanger ? require(`${`./images/earlybird.png`}`): require(`${`./images/owl.png`}`)} alt="owl" className="owl-no-eyes" style={{ width: modeChanger ? '40px': '20px'}}/>
                        <img src={modeChanger ? require(`${`./images/earlybird-shine.png`}`): require(`${`./images/owlEyes.png`}`)} alt="owl-eyes" className="owl-eyes" style={{ width: modeChanger ? '40px': '20px'}}/>
                    </i>
                </div>
              </div>
              <div className="mobile-menu">
                <FontAwesomeIcon id="menu-icon" icon={faBars} style={{color: "hsl(240, 76%, 35%)",opacity: `${menuClicked ? '0' : '1'}` }} onClick={mobileMenuClicked} />
                <div className={`mobile-menu-items ${menuClicked ? 'menu-clicked' : ''}`}>
                  <FontAwesomeIcon icon={faX} style={{color: "hsl(240, 76%, 35%)",}} onClick={closeMenuClicked} />
                  <Link to='/' className={location.pathname === '/' ? 'current-page' : 'not-current-page'} onClick={closeMenuClicked} >Home</Link>
                  <Link to='/Portfolio' className={location.pathname === '/Portfolio' ? 'current-page' : 'not-current-page'} onClick={closeMenuClicked}>My Portfolio</Link>
                  <Link to='/About-Me'className={location.pathname === '/About-Me' ? 'current-page' : 'not-current-page'} onClick={closeMenuClicked}>About Me</Link>
                  <Link to='/Contact'className={location.pathname === '/Contact' ? 'current-page' : 'not-current-page'} onClick={closeMenuClicked}>Contact</Link>
                  <div className="dark-light-mode" onClick={()=>modeHandler()}>
                      <p>{modeChanger ? `Light Mode` : `Dark Mode`}</p>
                      <i className="mode-icon">
                          <img src={modeChanger ? require(`${`./images/earlybird.png`}`): require(`${`./images/owl.png`}`)} alt="owl" className="owl-no-eyes" style={{ width: modeChanger ? '40px': '20px'}}/>
                          <img src={modeChanger ? require(`${`./images/earlybird-shine.png`}`): require(`${`./images/owlEyes.png`}`)} alt="owl-eyes" className="owl-eyes" style={{ width: modeChanger ? '40px': '20px'}}/>
                      </i>
                  </div>
                </div>
                
              </div>
          </div>
        </div>
      </div>
    );
}
 
export default Navabar;