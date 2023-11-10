import { Link } from 'react-router-dom';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"


const Footer = () => {
    return (
        <div className="footer">
            <Link to='https://github.com/xCordeva'><FontAwesomeIcon icon={faGithub}/></Link>
            <Link to='https://www.linkedin.com/in/ahmed-abdelaall/'><FontAwesomeIcon className='svg-linkedin' icon={faLinkedinIn} style={{color: "black",}} /></Link>
            <Link to='https://www.facebook.com/ahmed.abdelaallx'><FontAwesomeIcon icon={faFacebook}/></Link>
        </div>
    );
}
 
export default Footer;