import React from 'react';
import './AboutUs.css'; // Import the CSS file

function AboutUs() {
  return (
    <div className="about-us">
      <header className="about-header">
        <h1>About Us</h1>
      </header>
      <section className="about-content">
        <div className="about-section">
          <h2>Who We Are</h2>
          <p>
            We are a dynamic team dedicated to revolutionizing the job-seeking experience. Our platform leverages innovative technology and creative solutions to connect job seekers with their ideal careers.
          </p>
        </div>
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower job seekers by providing them with the tools and resources they need to excel in their job search. We are committed to fostering growth and opportunity for every individual.
          </p>
        </div>


        <div className="about-section">
          {/* <h2>Introducing the Guhuza Job-Seeking Game</h2> */}
          {/* <h3>What Is It?</h3> */}
          {/* <p>
            The Guhuza Job-Seeking Game is a cutting-edge, web-based application designed to transform the traditional job-seeking process into an engaging, interactive experience. By combining elements of gamification with real-world job search challenges, we aim to make the process of finding a job both exciting and effective.
          </p> */}

          {/* <h3>Core Objectives</h3>
          <ul>
            <li><strong>Engage Users:</strong> Create a fun and engaging experience that keeps users motivated and involved in their job search.</li>
            <li><strong>Boost Platform Activity:</strong> Leverage network effects to increase user registration and activity on the Guhuza platform.</li>
            <li><strong>Simulate Real-Life Challenges:</strong> Offer career-themed challenges and competitive elements that mirror the real job search process.</li>
          </ul>
          <h3>Key Features</h3>
          <ul>
            <li><strong>Interactive Challenges:</strong> Participate in career-themed challenges that test your skills and knowledge, and earn rewards for your achievements.</li>
            <li><strong>Leaderboards:</strong> Compete with other players and climb the leaderboards based on your performance in various job-seeking tasks.</li>
            <li><strong>Competitive Elements:</strong> Engage in competitive scenarios that mimic real-life job search situations, helping you prepare for actual job applications and interviews.</li>
          </ul> */}

          <h3>Why Play?</h3>
          <ul>
            <li><strong>Enhance Your Job Search Skills:</strong> Develop and refine skills that are essential for a successful job search.</li>
            <li><strong>Stay Motivated:</strong> Enjoy a game-like experience that keeps you engaged and motivated throughout your job search journey.</li>
            <li><strong>Network and Connect:</strong> Join a community of job seekers and professionals, share experiences, and gain valuable insights.</li>
          </ul>
          <h3>Get Involved</h3>
          <p>
            Join us on this exciting journey to revolutionize the job-seeking experience. Play the Guhuza Job-Seeking Game, connect with other users, and take the first step toward your ideal career today!
          </p>
        </div>


      </section>
      <footer className="about-footer">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AboutUs;
