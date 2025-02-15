import React, { useState, useEffect } from "react";
import "./JobTitleMatchingGame.css"; // Import the CSS file

function JobTitleMatchingGame() {
  const [jobTitles, setJobTitles] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // State for selected job title
  const [questions, setQuestions] = useState([]); // Questions for selected job
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(60); // Set timer to 1 minute
  const [bestScore, setBestScore] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [userType, setUserType] = useState(null);

  // Fetch job titles and user details on component mount
  useEffect(() => {
    async function fetchJobTitles() {
      try {
        const response = await fetch("http://localhost:3001/api/job-titles");
        const data = await response.json();
        setJobTitles(data);
      } catch (error) {
        console.error("Error fetching job titles:", error);
      }
    }

    async function fetchUserDetails() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/api/user-details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUsername(data.username);
        setEmail(data.email);
        setUserType(data.userType)

      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }

    fetchJobTitles();
    fetchUserDetails();
  }, []);

  // Fetch questions based on selected job title
  useEffect(() => {
    if (selectedJob) {
      async function fetchQuestions() {
        try {
          const response = await fetch(
            `http://localhost:3001/api/questions?job_title=${selectedJob}`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch questions');
          }
          const data = await response.json();
          setQuestions(data);
        } catch (error) {
          console.error('Error fetching questions:', error);
          alert('Error fetching questions, please try again.');
        }
      }
      fetchQuestions();
    }
  }, [selectedJob]);

  // Timer logic
  useEffect(() => {
    if (timer > 0 && currentQuestionIndex < questions.length) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(timerInterval); // Cleanup interval
    } else if (timer === 0) {
      // Move to next question if time is up
      handleNext();
    }
  }, [timer, currentQuestionIndex, questions.length]);

  const handleAnswer = (questionId, answer) => {
    setUserAnswers({ ...userAnswers, [questionId]: answer });
    setIsAnswered(true);
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setIsAnswered(false);
    setTimer(60); // Reset timer for next question
  };

  const handleSubmit = async () => {
    const correctAnswers = questions.reduce((acc, question) => {
      if (userAnswers[question.id] === question.correct_answer) {
        acc += 1;
      }
      return acc;
    }, 0);

    setScore(correctAnswers);

    try {
      const response = await fetch("http://localhost:3001/api/save-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, userType, score: correctAnswers }),
      });

      if (!response.ok) {
        throw new Error("Failed to save score");
      }

      const result = await response.json();
      setBestScore(result.bestScore);
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  return (
    <div className="game-container">
      {/* If no job selected yet */}
      {!selectedJob ? (
        <div>
          <h1>Select a Profession (Job Title)</h1>
          <select
            onChange={(e) => setSelectedJob(e.target.value)}
            defaultValue=""
            className="dropdown"
          >
            <option value="" disabled>
              Select Job Title
            </option>
            {jobTitles && jobTitles.length > 0 ? (
              jobTitles.map((title) => (
                <option key={title.id} value={title.job_title}>
                  {title.job_title}
                </option>
              ))
            ) : (
              <option value="">Loading Job Titles...</option>
            )}
          </select>
        </div>
      ) : score === null ? (
        // If score is not yet submitted
        <>
          <div className="progress">
            <p>
              Question {currentQuestionIndex + 1} of {questions.length} | Time Left: {timer}s
            </p>
          </div>

          {questions.length > 0 ? (
            <div className="game-item">
              <h1>{questions[currentQuestionIndex]?.question}</h1>
              <select
                onChange={(e) =>
                  handleAnswer(questions[currentQuestionIndex]?.id, e.target.value)
                }
                defaultValue=""
                className="dropdown"
              >
                <option value="" disabled>
                  Select Your Answer
                </option>
                <option value={questions[currentQuestionIndex]?.answer_1}>
                  {questions[currentQuestionIndex]?.answer_1}
                </option>
                <option value={questions[currentQuestionIndex]?.answer_2}>
                  {questions[currentQuestionIndex]?.answer_2}
                </option>
                <option value={questions[currentQuestionIndex]?.answer_3}>
                  {questions[currentQuestionIndex]?.answer_3}
                </option>
                <option value={questions[currentQuestionIndex]?.answer_4}>
                  {questions[currentQuestionIndex]?.answer_4}
                </option>
              </select>
            </div>
          ) : (
            <div>Loading questions...</div>
          )}

          <div className="game-controls">
            {isAnswered && currentQuestionIndex < questions.length - 1 && (
              <button onClick={handleNext}>Next</button>
            )}
            {currentQuestionIndex === questions.length - 1 && isAnswered && (
              <button onClick={handleSubmit}>Submit</button>
            )}
          </div>
        </>
      ) : (
        // Show score after completing the quiz
        <div className="score-container">
          <h1 className="score-header">🎉 Your Score: {score} / {questions.length} 🎉</h1>
          {bestScore !== null && (
            <h1 className="best-score">
              🌟 Your Best Score: {bestScore} 🌟
            </h1>
          )}
        </div>
      )}
    </div>
  );
}

export default JobTitleMatchingGame;
