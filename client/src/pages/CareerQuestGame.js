import React, { useState } from 'react';
import './CareerQuestGame.css'; // Add some styling for the game

const CareerQuestGame = () => {
  const [step, setStep] = useState(1);
  const [resumeScore, setResumeScore] = useState(0);
  const [networkingScore, setNetworkingScore] = useState(0);
  const [interviewScore, setInterviewScore] = useState(0);

  // Function to handle the next step of the game
  const handleNextStep = () => {
    setStep(step + 1);
  };

  // Placeholder functions for game actions
  const handleResumeBuilding = () => {
    const score = Math.floor(Math.random() * 100); // Generate a random score
    setResumeScore(score);
    handleNextStep();
  };

  const handleNetworking = () => {
    const score = Math.floor(Math.random() * 100);
    setNetworkingScore(score);
    handleNextStep();
  };

  const handleInterview = () => {
    const score = Math.floor(Math.random() * 100);
    setInterviewScore(score);
    handleNextStep();
  };

  return (
    <div className="career-quest-container">
      <h1>Welcome to Career Quest!</h1>
      <p>Your journey to land your dream job begins here!</p>

      {step === 1 && (
        <div className="step">
          <h2>Step 1: Resume Building</h2>
          <p>Let's build a resume! Make sure to highlight your skills and experience.</p>
          <button className="action-btn" onClick={handleResumeBuilding}>
            Build Resume
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="step">
          <h2>Step 2: Networking</h2>
          <p>Attend a virtual networking event. Make new contacts!</p>
          <button className="action-btn" onClick={handleNetworking}>
            Start Networking
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="step">
          <h2>Step 3: Interview</h2>
          <p>You're now ready for the interview! Answer the questions confidently.</p>
          <button className="action-btn" onClick={handleInterview}>
            Attend Interview
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="results">
          <h2>Congratulations on completing Career Quest!</h2>
          <p>Here are your scores:</p>
          <ul>
            <li>Resume Building Score: {resumeScore}</li>
            <li>Networking Score: {networkingScore}</li>
            <li>Interview Score: {interviewScore}</li>
          </ul>
          <p>Based on your performance, you'll receive job offers soon!</p>
          <button className="action-btn" onClick={() => setStep(1)}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default CareerQuestGame;
