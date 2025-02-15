// ContactPage.js
import React, { useState } from "react";
import "./ContactPage.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormStatus("Your message has been sent! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>If you have any questions or feedback, feel free to reach out to us!</p>
      </div>

      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit">Send Message</button>
        </form>

        {formStatus && <p className="form-status">{formStatus}</p>}
      </div>

      {/* Additional Content */}
      <div className="additional-info">
        <div className="contact-details">
          <h3>Our Office</h3>
          <p>
            <FaMapMarkerAlt /> 1234 Movie Street, Film City, Hollywood, CA 90001
          </p>
          <p>
            <FaPhoneAlt /> (123) 456-7890
          </p>
          <p>
            <FaEnvelope /> contact@moviewebsite.com
          </p>
        </div>

        <div className="social-media">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FiFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FiInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FiTwitter />
            </a>
          </div>
        </div>

        <div className="google-map">
          <h3>Find Us On The Map</h3>
          <iframe
            title="Location on Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2422740335545!2d-122.4194153846816!3d37.77492977975991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808f6d8e91f1%3A0x507f1f88fcb9b874!2sSan%20Francisco%2C%20CA%2094148!5e0!3m2!1sen!2sus!4v1652290744992!5m2!1sen!2sus"
            width="600"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        <div className="faq-section">
          <h3>Frequently Asked Questions (FAQ)</h3>
          <div className="faq-item">
            <h4>How can I contact support?</h4>
            <p>You can reach us through the contact form above or via email at contact@moviewebsite.com.</p>
          </div>
          <div className="faq-item">
            <h4>Can I cancel my subscription?</h4>
            <p>Yes, you can cancel your subscription anytime by contacting us through email.</p>
          </div>
          <div className="faq-item">
            <h4>Where is your office located?</h4>
            <p>Our office is located at 1234 Movie Street, Film City, Hollywood, CA 90001.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
