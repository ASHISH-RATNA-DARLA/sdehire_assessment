// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import InterviewPage from './InterviewPage';
import InterviewReport from './InterviewReport';
import FeedbackForm from './feedback-form'; // Import the FeedbackForm page
import Profile from './ProfilePage';
import Settings from './settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/interview-report" element={<InterviewReport />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/feedbackform" element={<FeedbackForm />} /> {/* Feedback Form Route */}
      </Routes>
    </Router>
  );
}

export default App;
