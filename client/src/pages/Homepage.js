import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, EmailShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, LinkedinIcon, EmailIcon, WhatsappIcon } from "react-share";
import "./Homepage.css"; // Import the CSS file
import Footer from "./Footer"; // Correct relative path

function Homepage({ email }) {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const [userBestScore, setUserBestScore] = useState(0);
  const [groupBestScore, setGroupBestScore] = useState(0);

  const userType = localStorage.getItem("userType");

  console.log('userType cache:',userType);

  const bannerImages = [
    "/images/banner5.jpg",
    "/images/banner4.jpg",
    "/images/banner.png",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll functionality for banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // Detect scroll direction and hide/show header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    async function fetchUserBestScore() {
      try {
        const response = await fetch(
          `http://localhost:3001/api/user-best-score?email=${email}`
        );
        const data = await response.json();
        setUserBestScore(data.bestScore);
      } catch (error) {
        console.error("Error fetching user best score:", error);
      }
    }

    async function fetchGroupBestScore() {
      try {
        const response = await fetch(
          "http://localhost:3001/api/group-best-score"
        );
        const data = await response.json();
        setGroupBestScore(data.groupBestScore);
      } catch (error) {
        console.error("Error fetching group best score:", error);
      }
    }

    fetchUserBestScore();
    fetchGroupBestScore();
  }, [email]);

  const shareUrl = window.location.href;

  return (
    <div className="homepage-container">
      <header className={`header ${visible ? "visible" : "hidden"}`}>
        <img src="/images/logo_white_large.png" alt="Logo" className="logo" />
        <nav className="nav">
          {userType === "Employer" ? (
            <Link to="/users">Leaderboard</Link>
          ) : (
            <Link to="/users">Leaderboard</Link>
          )}

          {userType === "Employer" ? (
            <Link to="/upload-job">Post A Job</Link>
          ) : (
            <Link to="/apply-job">Upload CV</Link>
          )}

          {userType === "Employer" ? (
            <Link to="/hireACandidate">Hire</Link>
          ) : (
            <Link to="/applyJob">Apply for a Job</Link>
          )}
        
          {/* <Link to="/career-quest">Play Career Quest</Link> */}
          <Link to="/about-us">About Us</Link>
          <Link to="/contact-us">Contact Us</Link>
          <Link to="/">Sign Out</Link>
        </nav>
      </header>

      {/* Banner section */}
      <div className="banner-section">
        <div className="banner">
          <img
            src={bannerImages[currentIndex]}
            alt={`Banner ${currentIndex + 1}`}
            className="banner-image"
          />
        </div>
        <div className="dots-container">
          {bannerImages.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>

      <div className="main-content">
        <h2>Explore More Features</h2>
        <div className="feature">
          <h3>Job Title Matching Quiz</h3>
          <p>
            Take a quiz to find the right job fit based on your skills,
            interests, and experience.
          </p>
          <Link to="/job-match" className="feature-link">
            Start Job Match Quiz
          </Link>
        </div>
   {/* Share Button */}
<div className="share-section">
  <h3>Invite Your Friends to Take the Quiz</h3>
  <div className="share-buttons">
    <FacebookShareButton url={shareUrl} quote="Check out this amazing job portal!">
      <FacebookIcon size={32} round={true} />
    </FacebookShareButton>
    <TwitterShareButton url={shareUrl} title="Check out this amazing job portal!">
      <TwitterIcon size={32} round={true} />
    </TwitterShareButton>
    <LinkedinShareButton url={shareUrl}>
      <LinkedinIcon size={32} round={true} />
    </LinkedinShareButton>
    <EmailShareButton url={shareUrl} subject="Check out this amazing job portal!" body="Check out this page: ">
      <EmailIcon size={32} round={true} />
    </EmailShareButton>
    <WhatsappShareButton url={shareUrl} title="Check out this amazing job portal!">
      <WhatsappIcon size={32} round={true} />
    </WhatsappShareButton>
  </div>
</div>
</div>

      {/* Our Partners Section */}
      <section className="partners-section">
        <h2>Our Partners</h2>
        <div className="partners-grid">
          {/* Replace these src with your actual image paths */}
          <img
            src="https://guhuza.com/partners/monstor.jpg"
            alt="Partner A"
            className="partner-image"
          />
          <img
            src="https://guhuza.com/partners/TorontoJobs.ca.jpg"
            alt="Partner B"
            className="partner-image"
          />
          <img
            src="https://guhuza.com/partners/DMZ.png"
            alt="Partner C"
            className="partner-image"
          />
          <img
            src="https://guhuza.com/partners/TorontoRecruitersConference.webp"
            alt="Partner D"
            className="partner-image"
          />
          <img
            src="https://guhuza.com/partners/TotechCareerFair.png"
            alt="Partner E"
            className="partner-image"
          />
          <img
            src="https://guhuza.com/partners/TorontoEntrePreneursConference.jpg"
            alt="Partner F"
            className="partner-image"
          />
          <img
            src="https://guhuza.com/partners/ventureLAB_full_color.png"
            alt="Partner G"
            className="partner-image"
          />
          <img
            src="https://guhuza.com/partners/Humber_Logo.png"
            alt="Partner H"
            className="partner-image"
          />
          <img
            src="https://guhuza.com/partners/TriosCollege.png"
            alt="Partner I"
            className="partner-image"
          />
        </div>
      </section>

      {/* Successful Guhuza Users Section */}
      <section className="successful-users-section">
        <h2>Successful Guhuza Users</h2>
        <div className="users-grid">
          <div className="user">
            <img
              src="https://guhuza.com/images/landing/headshots/headshot_3.jpg"
              alt="User 3"
              className="user-image"
            />
            <div className="user-info">
              <h4 className="user-name">AB</h4>
              <p className="user-role">Corporate Recruiter</p>
              <p className="user-feedback">
                Guhuza is so user friendly and efficient for time management.
                Thanks to Guhuza, I’ve been able to reach and connect with
                candidates faster than any traditional recruiting method.
              </p>
            </div>
          </div>

          <div className="user">
            <img
              src="https://guhuza.com/images/landing/headshots/headshot_3.jpg"
              alt="User 3"
              className="user-image"
            />
            <div className="user-info">
              <h4 className="user-name">CD</h4>
              <p className="user-role">Job Seeker</p>
              <p className="user-feedback">
                It's a great solution! Created my profile, very efficient and
                straightforward process. Waiting to see how effective it would
                be for me!
              </p>
            </div>
          </div>

          <div className="user">
            <img
              src="https://guhuza.com/images/landing/headshots/headshot_3.jpg"
              alt="User 3"
              className="user-image"
            />
            <div className="user-info">
              <h4 className="user-name">TN</h4>
              <p className="user-role">Student</p>
              <p className="user-feedback">
                It's a great solution! Created my profile, very efficient and
                straightforward process. Waiting to see how effective it would
                be for me!
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {/* <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </footer> */}
    </div>
  );
}

export default Homepage;
