import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Contact.css';
import { faEnvelope,faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useForm, ValidationError } from '@formspree/react';
import { Link } from "react-router-dom";


const Contact = () => {

    const [state, handleSubmit] = useForm("mjvqzjkk");
    if (state.succeeded) {
        return <div className="thank-you">
                    <h1>Thank you for reaching out. I'll get back to you soon!</h1>
                    <Link to={'/'}>Back To Home Page</Link>
                </div>;
    }

    return (
        <div className="contact">
            <h1>Send Me an Email <FontAwesomeIcon icon={faEnvelope} style={{color: "hsl(240, 76%, 35%)",}} /></h1>
            <div className="contact-form">
                <form className="add-comment-form" onSubmit={handleSubmit}>
                    <input type="text" name="name" id="name" placeholder="Your name (e.g., John Doe)"></input>
                    <input type="email" name="email" id="email" placeholder="Your email (e.g., yourname@example.com)" required></input>
                    <ValidationError 
                        prefix="Email" 
                        field="email"
                        errors={state.errors}
                    />
                    <textarea name="message" id="message" placeholder="Type your message here" required></textarea>
                    <ValidationError 
                        prefix="Message" 
                        field="message"
                        errors={state.errors}
                    />
                    <div className="leave-a-comment">
                        <button disabled={state.submitting}><span>SEND MESSAGE</span>
                        <FontAwesomeIcon icon={faPaperPlane} style={{color: "#ffffff",}} /></button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default Contact;