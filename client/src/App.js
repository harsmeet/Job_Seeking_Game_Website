import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './pages/Register';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import UserList from './components/UserList'; 
import ApplyJobPage from './pages/ApplyJobPage';
import UploadAJob from './pages/UploadAJob';
import ApplyJob from './components/ApplyJob';
import CareerQuestGame from './pages/CareerQuestGame';
import JobMatchQuiz from './pages/JobMatchQuiz';
import VirtualResumeBuilder from './pages/VirtualResumeBuilder';
import InteractiveTutorials from './pages/InteractiveTutorials';
import JobTitleMatchingGame from "./components/JobTitleMatchingGame"; // Adjust the path as necessary
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import HireACandidate from './components/HireACandidate';

function App() {
  const userType = localStorage.getItem('userType');

  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
 
        {/* {userType === 'Employer' ? ( */}
          <Route path="/users" element={<UserList />} />
        {/* ) : (
          <Route path="/homepage" element={<Homepage />} />
        )} */}

        <Route path="/career-quest" element={<CareerQuestGame />} />
        <Route path="/apply-job" element={<ApplyJobPage />} />
        <Route path="/upload-job" element={<UploadAJob />} />
        <Route path="/applyJob" element={<ApplyJob />} />
        <Route path="/hireACandidate" element={<HireACandidate />} />
        <Route path="/job-match" element={<JobTitleMatchingGame />} />
        <Route path="/job-match-quiz" element={<JobMatchQuiz />} />
        <Route path="/virtual-resume-builder" element={<VirtualResumeBuilder />} />
        <Route path="/interactive-tutorials" element={<InteractiveTutorials />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/" element={<Registration />} /> {/* Redirect root to Registration */}
      </Routes>
    </Router>
  );
}

export default App;
