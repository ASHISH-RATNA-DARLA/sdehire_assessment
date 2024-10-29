import React, { useState, useEffect } from "react";
import { Book, Code, MessageSquare, Trophy, Menu,Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import "./Dashboard.css";

const Card = ({ children, className }) => <div className={className}>{children}</div>;
const CardHeader = ({ children }) => <div>{children}</div>;
const CardTitle = ({ children, className }) => <h3 className={className}>{children}</h3>;
const CardContent = ({ children }) => <div>{children}</div>;
const CardDescription = ({ children }) => <p>{children}</p>;
const Button = ({ children, onClick, className }) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
);

const features = [
  { title: "Guided Interview Practice", description: "Prepare for technical interviews with our AI-powered mock interview sessions.", icon: <MessageSquare className="feature-icon" /> },
  { title: "Coding Challenges", description: "Sharpen your coding skills with a variety of programming challenges across different difficulty levels.", icon: <Code className="feature-icon" /> },
  { title: "Real-time Feedback", description: "Receive instant feedback on your performance to help you improve quickly.", icon: <Trophy className="feature-icon" /> },
  { title: "Adaptive Learning Paths", description: "Personalized learning journeys that adapt to your skill level and goals.", icon: <Book className="feature-icon" /> },
];

export default function Dashboard() {
  const [isSidebarVisible, setSidebarVisible] = useState(false); // Toggle sidebar visibility
  const [showVideo, setShowVideo] = useState(false); // State for showing video
  const navigate = useNavigate();

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

  const handleStartInterview = () => {
    navigate("/interview");
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <Button onClick={toggleSidebar} className="menu-button">
          <Menu className="menu-icon" />
        </Button>
        <h1 className="page-title">Dashboard</h1>
      </header>

      <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} /> {/* Use the Sidebar component */}

      <main className="main-content">
        <section className="feature-overview">
          <h2 className="section-title">Feature Overview</h2>
          <div className="carousel">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card">
                <CardHeader>
                  <CardTitle className="card-title">
                    <span className="card-icon">{feature.icon}</span>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="tutorial-section">
          <h2 className="section-title">How to Use Our Platform</h2>
          {showVideo ? (
            <div className="video-player">
              <div className="video-placeholder">Video Player Placeholder</div>
            </div>
          ) : (
            <Button onClick={() => setShowVideo(true)} className="btn tutorial-btn">
              <Play className="btn-icon" />
              Watch Tutorial
            </Button>
          )}
        </section>

        <section className="start-practice-section">
          <Button onClick={handleStartInterview} className="btn start-btn">
            Start Interview Practice
          </Button>
        </section>
      </main>
    </div>
  );
}
