// src/Game.js
import React, { useState } from 'react';

function Game() {
  const [questions] = useState([
    { title: 'Software Engineer', description: 'Responsible for developing software applications.' },
    { title: 'Data Scientist', description: 'Analyzes and interprets complex data.' },
    { title: 'Project Manager', description: 'Oversees project planning and execution.' }
  ]);

  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleAnswer = (title, description) => {
    setUserAnswers({ ...userAnswers, [title]: description });
  };

  const handleSubmit = () => {
    const correctAnswers = questions.reduce((acc, q) => {
      if (userAnswers[q.title] === q.description) {
        acc += 1;
      }
      return acc;
    }, 0);
    setScore(correctAnswers);
  };

  return (
    <div>
      <h1>Job Title Matching Game</h1>
      {questions.map((q, index) => (
        <div key={index}>
          <h2>{q.title}</h2>
          <select onChange={(e) => handleAnswer(q.title, e.target.value)} defaultValue="">
            <option value="" disabled>Select Description</option>
            {questions.map((desc, i) => (
              <option key={i} value={desc.description}>{desc.description}</option>
            ))}
          </select>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {score !== null && <h2>Your Score: {score} / {questions.length}</h2>}
    </div>
  );
}

export default Game;
