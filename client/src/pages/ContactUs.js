import React from 'react';
import './ContactUs.css'; // Import the CSS file

function ContactUs() {
  return (
    <div className="contact-us">
      <header className="contact-header">
        <h1>Contact Us</h1>
      </header>
      <section className="contact-info">
        <h2>Get in Touch</h2>
        <p>
          If you have any questions, feel free to reach out to us. We're here to help!
        </p>
        <div className="contact-details">
          <div className="contact-item">
            <h3>Address</h3>
            <p>1234 Street Name, City, Country</p>
          </div>
          <div className="contact-item">
            <h3>Phone</h3>
            <p>(+123) 456-7890</p>
          </div>
          <div className="contact-item">
            <h3>Email</h3>
            <p>info@yourcompany.com</p>
          </div>
        </div>
        <div className="map">
          <h3>Find Us</h3>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.46424553886!2d-74.0059412791439!3d40.71277533194507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a2f0ab12345%3A0x47a191231a3c123!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1638499495550!5m2!1sen!2sus"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
      <footer className="contact-footer">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ContactUs;
