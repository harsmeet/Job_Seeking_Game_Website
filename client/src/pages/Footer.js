import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      {/* Top section with dark blue background */}
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-logo">
            <img
              src="/images/logo_white_large.png"
              alt="Logo"
              className="logo"
            />
          </div>
          <div className="footer-sub">
            <p>Copyright ©2024 Guhuza.
            v3.2.22</p>
          </div>
          <div className="footer-social">
            <p>GET SOCIAL WITH US!</p>
          </div>
          <div className="social-icons">
            <a href="#">
              <img src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/56-linkedin-256.png" alt="LinkedIn" />
            </a>
            <a href="#">
              <img src="https://cdn3.iconfinder.com/data/icons/social-media-2169/24/social_media_social_media_logo_tripadvisor-256.png" alt="Facebook" />
            </a>
            <a href="#">
              <img src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Instagram-256.png" alt="Instagram" />
            </a>
            <a href="#">
              <img src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/74-outlook-256.png" alt="YouTube" />
            </a>
            <a href="#">
              <img src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Twitter-256.png" alt="Spotify" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom section with light grey background */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-columns">
            {/* Company Info column */}
            <div className="footer-column">
              <h4>Company Info</h4>
              <a href="#">About Us</a>
              <a href="#">Investor Relations</a>
            </div>

            {/* Legal column */}
            <div className="footer-column">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
              <a href="#">Cookie Policy</a>
              <a href="#">Subscription Agreement</a>
            </div>

            {/* Support column */}
            <div className="footer-column">
              <h4>Support</h4>
              <a href="#">Contact Us</a>
              <a href="#">Help</a>
            </div>

            {/* Mailing List column */}
            <div className="footer-column">
              <h4>Mailing List</h4>
              <a href="#">Join Our Job Seeker Mailing List</a>
              <a href="#">Join Our Employer Mailing List</a>
            </div>

            {/* Download the app column */}
            <div className="footer-column">
              <h4>Download the app</h4>
              <a href="#">
                <img src="https://guhuza.com/images/footer/download_app_store.png" alt="iOS App" />
              </a>
              <a href="#">
                <img src="https://guhuza.com/images/footer/download_google_play.png" alt="Android App" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Powered by section */}
      <div className="footer-powered">
        <h4>Powered by:</h4>
        <a href="#">
          <img
            src="https://guhuza.com/toronto-jobs/logo3.png"
            alt="Toronto Jobs Logo"
            className="powered-image" // Add a class for styling
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
