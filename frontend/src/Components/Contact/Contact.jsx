import React from 'react'
import { successNotification, errorNotification } from '../../plugins/Notification';
import './Contact.css'
import msg_item from '../../assets/msg-icon.png'
import mail_icon from '../../assets/mail-icon.png'
import phone_icon from '../../assets/phone-icon.png'
import location_icon from '../../assets/location-icon.png'

const Contact = () => {

  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "064bc6b7-340e-4e45-808b-3e2fd65fee0b");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      successNotification("Success", data)
      event.target.reset();
    } else {
      setResult(data.message);
      errorNotification("Error", data);
    }
  };

  return (
    <div className='contact'>
      <div className="contact-col">
            <h3>Send us a message  <img src={msg_item} alt="" /></h3>
            <p>
            We'd love to hear from you! Whether you have questions, feedback, or need assistance, 
            feel free to reach out. Please send us a message using the form below, 
            and our team will get back to you as soon as possible.
            </p>
            <ul>
                <li><img src={mail_icon} alt="" />Contact@contact.dev</li>
                <li><img src={phone_icon} alt="" />+62-812-1955-8888</li>
                <li><img src={location_icon} alt="" />Jakarta, Indonesia</li>
            </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
            <label>Your Name</label>
            <input type="text" name='name' placeholder='Enter your name' required/>
            <label>Phone Number</label>
            <input type="tel" name='phone' placeholder='Enter your mobile number' required/>
            <label>Write your messages here</label>
            <textarea type="tel" name='message' rows="6" placeholder='Enter your message' required/>
            
            <button type="submit" className="btn btn-primary">Submit Now</button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  )
}

export default Contact
