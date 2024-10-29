import React, { useState, useEffect } from 'react';
import { Book, Code, MessageSquare, Trophy, Menu,Play } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Import Sidebar component
import './InterviewPage.css';

const INITIAL_COINS = 100;
const HINT_COST = 20;

export default function GuidedInterviewPage() {
  const [isSidebarVisible, setSidebarVisible] = useState(false); // Toggle sidebar visibility

  const [coins, setCoins] = useState(INITIAL_COINS);
  const [progress, setProgress] = useState(0);
  const [isHintUnlocked, setHintUnlocked] = useState(false);
  const navigate = useNavigate();
  const Button = ({ children, onClick, className }) => (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
  const handleUnlock = (cost) => {
    if (coins >= cost) {
      setCoins((prev) => prev - cost);
      setHintUnlocked(true);
    }
  };
  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isSidebarVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup function to ensure class is removed when component unmounts
    return () => document.body.classList.remove("no-scroll");
  }, [isSidebarVisible]);
  const handleEndInterview = () => {
    navigate('/interview-report');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="interview-page-container">
<div className="header">
        <Button onClick={toggleSidebar} className="menu-button">
          <Menu className="menu-icon" />
        </Button>
        <h1 className="page-title">INTERVIEW</h1>
      </div>

      <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />       <div className="interview-page-content">
        <div className="interview-page-header">
          <p>Practice your coding skills in a realistic interview environment.</p>
        </div>
        <div className="interview-page-coins-section">
          <div className="interview-page-coins">
            <span>{coins} Coins</span>
            <div className="interview-page-progress-bar">
              <div className="interview-page-progress-value" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          <button className="interview-page-button" onClick={handleEndInterview}>
            End Interview
          </button>
        </div>

        <div className="interview-page-grid">
          <div className="space-y-6">
            <div className="interview-page-question-box">
              <h2>Interview Question</h2>
              <p>Implement a function that finds the longest palindromic substring in a given string.</p>
            </div>

            <div className={`interview-page-hint-box ${isHintUnlocked ? 'unlocked' : 'locked'}`}>
              <h3>Hint:</h3>
              {isHintUnlocked ? (
                <p>Consider using dynamic programming to optimize your solution.</p>
              ) : (
                <p className="locked-text">Hint is locked. Spend {HINT_COST} coins to unlock.</p>
              )}
              {!isHintUnlocked && (
                <button
                  className="interview-page-button unlock-button"
                  onClick={() => handleUnlock(HINT_COST)}
                  disabled={coins < HINT_COST}
                >
                  Unlock Hint
                </button>
              )}
            </div>

            <div className="interview-page-video-header">Lisa AI Interview</div>
            <div className="interview-page-video-body">
              <video width="100%" height="200px" controls autoPlay loop className="interview-page-video">
                <source src="/lisa.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div className="interview-page-code-box">
            <h2>Code Editor</h2>
            <pre>{`function example() {
  console.log("Hello, world!");
}

// Start coding here...`}</pre>
          </div>
        </div>

        <div className="interview-page-floating-video">
          <div className="interview-page-floating-video-header">
            Your Video
            <button className="minimize-button">_</button>
          </div>
          <div className="interview-page-floating-video-body">
            <span>Video Feed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
