import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'


const Footer = () => {
    return (
        <div className="footer">
            <FontAwesomeIcon icon={faGithub}/>
            <FontAwesomeIcon icon={faFacebook}/>
            <FontAwesomeIcon icon={faLinkedinIn} style={{color: "black",}} />
        </div>
    );
}
 
export default Footer;