import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import * as XLSX from 'xlsx'; // Import xlsx
import './InterviewReport.css';
import { Book, Code, MessageSquare, Trophy, Menu,Play } from "lucide-react";
import Sidebar from "./Sidebar"; // Import the Sidebar component

// Helper function to generate random values
const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const Button = ({ children, onClick, className }) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
);
export default function InterviewReport() {
  const navigate = useNavigate(); // Initialize the useNavigate hook for navigation


  const [isSidebarVisible, setSidebarVisible] = useState(false); // Toggle sidebar visibility
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
  // Randomized state variables
  const [scoreData, setScoreData] = useState({
    technical: getRandomValue(70, 100),
    communication: getRandomValue(60, 90),
    composure: getRandomValue(70, 100),
    textAnalysis: getRandomValue(60, 90),
  });

  const [subScores, setSubScores] = useState([
    { name: 'Algorithm Score', value: getRandomValue(70, 100) },
    { name: 'Data Structures', value: getRandomValue(70, 100) },
    { name: 'System Design', value: getRandomValue(60, 100) },
    { name: 'Clarity', value: getRandomValue(60, 90) },
    { name: 'Conciseness', value: getRandomValue(60, 90) },
    { name: 'Stress Handling', value: getRandomValue(70, 100) },
    { name: 'Adaptability', value: getRandomValue(70, 100) },
    { name: 'Keyword Analysis', value: getRandomValue(60, 90) },
    { name: 'Sentiment Analysis', value: getRandomValue(60, 90) },
  ]);

  // Generate a random value for Passed in the pie chart
  const passedValue = getRandomValue(60, 90); // Random value for "Passed"
  const failedValue = 100 - passedValue; // Complement for "Failed"

  const [pieChartData, setPieChartData] = useState([
    { name: 'Passed', value: passedValue },
    { name: 'Failed', value: failedValue },
  ]);

  const [barChartData, setBarChartData] = useState([
    {
      name: 'Candidate A',
      technical: getRandomValue(70, 100),
      communication: getRandomValue(60, 90),
      composure: getRandomValue(70, 100),
      textAnalysis: getRandomValue(60, 90),
    },
    {
      name: 'Candidate B',
      technical: getRandomValue(70, 100),
      communication: getRandomValue(60, 90),
      composure: getRandomValue(70, 100),
      textAnalysis: getRandomValue(60, 90),
    },
    {
      name: 'Candidate C',
      technical: getRandomValue(70, 100),
      communication: getRandomValue(60, 90),
      composure: getRandomValue(70, 100),
      textAnalysis: getRandomValue(60, 90),
    },
  ]);

  const candidateDetails = {
    name: 'Ashish Ratna',
    sessionId: 'INT-2023-001',
    interviewer: 'Lisa',
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'score-green';
    if (score >= 50) return 'score-yellow';
    return 'score-red';
  };

  // Function to download the report as an Excel file with all metrics
  const downloadReportAsExcel = () => {
    const reportData = {
      CandidateDetails: [
        { Name: candidateDetails.name, 'Session ID': candidateDetails.sessionId, Interviewer: candidateDetails.interviewer },
      ],
      Scores: Object.entries(scoreData).map(([category, score]) => ({ Category: category, Score: score })),
      SubScores: subScores.map((score) => ({ Category: score.name, Score: score.value })),
      BarChart: barChartData.map((data) => ({
        Candidate: data.name,
        Technical: data.technical,
        Communication: data.communication,
        Composure: data.composure,
        TextAnalysis: data.textAnalysis,
      })),
      PieChart: pieChartData.map((data) => ({
        Category: data.name,
        Percentage: `${data.value}%`,
      })),
    };

    // Create a new workbook and worksheet for each section
    const workbook = XLSX.utils.book_new();
    const candidateDetailsSheet = XLSX.utils.json_to_sheet(reportData.CandidateDetails);
    const scoresSheet = XLSX.utils.json_to_sheet(reportData.Scores);
    const subScoresSheet = XLSX.utils.json_to_sheet(reportData.SubScores);
    const barChartSheet = XLSX.utils.json_to_sheet(reportData.BarChart);
    const pieChartSheet = XLSX.utils.json_to_sheet(reportData.PieChart);

    // Append the sheets to the workbook
    XLSX.utils.book_append_sheet(workbook, candidateDetailsSheet, 'Candidate Details');
    XLSX.utils.book_append_sheet(workbook, scoresSheet, 'Scores');
    XLSX.utils.book_append_sheet(workbook, subScoresSheet, 'Sub Scores');
    XLSX.utils.book_append_sheet(workbook, barChartSheet, 'Bar Chart Data');
    XLSX.utils.book_append_sheet(workbook, pieChartSheet, 'Pie Chart Data');

    // Create an Excel file and trigger the download
    XLSX.writeFile(workbook, 'Interview_Report_All_Metrics.xlsx');
  };

  // Handlers for navigation
  const handleFeedbackForm = () => {
    navigate('/feedbackform'); // Navigate to feedback form page
  };

  const handleNextInterviewPractice = () => {
    navigate('/interview'); // Navigate to interview practice page
  };

  return (
    <div className="report-page">

<header className="report_header">
  <div className="header-title">
    <Button onClick={toggleSidebar} className="menu-button">
      <Menu className="menu-icon" />
    </Button>
    <h1>SDE Interview Analytics</h1>
  </div>
</header>
<Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} /> {/* Sidebar component */}


      <main className="report-main">

        <div className="candidate-info">
          <div className="avatar">AR</div>
          <div>
            <h2>{candidateDetails.name}</h2>
            <p>Session ID: {candidateDetails.sessionId}</p>
            <p>Interviewer: {candidateDetails.interviewer}</p>
          </div>
        </div>

        <div className="score-cards">
          {Object.entries(scoreData).map(([key, value]) => (
            <div key={key} className={`score-card ${getScoreColor(value)}`}>
              <h2>{key.replace(/([A-Z])/g, ' $1').trim()} Score</h2>
              <p>{value}%</p>
            </div>
          ))}
        </div>

        <div className="charts-section">
          <div className="progress-bars">
            {subScores.map((score) => (
              <div key={score.name} className="progress-bar-container">
                <span>{score.name}</span>
                <div className="progress-bar">
                  <div style={{ width: `${score.value}%` }}></div>
                </div>
                <span>{score.value}%</span>
              </div>
            ))}
          </div>

          <div className="pie-chart-container">
            <h3>Test Cases Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieChartData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#4CAF50' : '#F44336'} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bar-chart-container">
          <h3>Candidate Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="technical" fill="#4CAF50" />
              <Bar dataKey="communication" fill="#FFEB3B" />
              <Bar dataKey="composure" fill="#2196F3" />
              <Bar dataKey="textAnalysis" fill="#9C27B0" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="suggestions">
          <h3>Suggestions</h3>
          <ul>
            <li>Focus on improving communication skills, especially when explaining complex concepts.</li>
            <li>Continue to build on strong problem-solving abilities demonstrated in algorithm questions.</li>
            <li>Dedicate time to deepening knowledge of data structures for more comprehensive solutions.</li>
            <li>Maintain composure during challenging questions, as demonstrated in the system design portion.</li>
          </ul>
        </div>

        {/* Buttons Section */}
        <div className="buttons-section">
          <button className="download-button" onClick={downloadReportAsExcel}>
            Download Report as Excel
          </button>
          <button className="feedback-button" onClick={handleFeedbackForm}>
            Student Feedback Form
          </button>
          <button className="next-interview-button" onClick={handleNextInterviewPractice}>
            Next Interview Practice
          </button>
        </div>
      </main>
    </div>
  );
}
