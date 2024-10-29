import React, { useState } from 'react';
import { ChevronRight, Bell, User, MessageSquare, Cog, Menu } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Sidebar from './Sidebar'; // Import Sidebar component
import './ProfilePage.css';

// Mock data for SDE preparation progress chart
const sdeProgressData = [
  { month: 'Jan', currentLevel: 20, targetLevel: 80 },
  { month: 'Feb', currentLevel: 30, targetLevel: 80 },
  { month: 'Mar', currentLevel: 40, targetLevel: 80 },
  { month: 'Apr', currentLevel: 50, targetLevel: 80 },
  { month: 'May', currentLevel: 60, targetLevel: 80 },
  { month: 'Jun', currentLevel: 65, targetLevel: 80 },
];

// Button Component
function Button({ children, onClick, className }) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

// Card Component
function Card({ children, className }) {
  return <div className={`sde-profile-card ${className}`}>{children}</div>;
}
Card.Header = ({ children }) => <div className="sde-profile-card-header">{children}</div>;
Card.Title = ({ children, className }) => <h3 className={`sde-profile-card-title ${className}`}>{children}</h3>;
Card.Content = ({ children }) => <div className="sde-profile-card-content">{children}</div>;

// Progress Component
function Progress({ value, className, indicatorClassName }) {
  return (
    <div className={`sde-profile-progress ${className}`}>
      <div className={`sde-profile-progress-indicator ${indicatorClassName}`} style={{ width: `${value}%` }} />
    </div>
  );
}

// Tabs Component
function Tabs({ defaultValue, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div>
      {React.Children.map(children, child =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
}

function TabsList({ children, className, setActiveTab }) {
  return (
    <div className={className}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { setActiveTab })
      )}
    </div>
  );
}

function TabsTrigger({ value, children, setActiveTab }) {
  return (
    <button onClick={() => setActiveTab(value)} className="sde-profile-tabs-trigger">
      {children}
    </button>
  );
}

function TabsContent({ value, activeTab, children }) {
  return value === activeTab ? <div>{children}</div> : null;
}

export default function SDEPrepProfilePage() {
  const [overallProgress, setOverallProgress] = useState(66);
  const [isSidebarVisible, setSidebarVisible] = useState(false); // Toggle sidebar visibility

  // Toggle Sidebar Visibility
  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div className="sde-profile-container">
      {/* Sidebar Component */}
      <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />

      {/* Main Header with Sidebar Toggle */}
      <header className="sde-profile-main-header">
        <Button onClick={toggleSidebar} className="sde-profile-menu-button">
          <Menu className="sde-profile-menu-icon" />
        </Button>
        <h1 className="sde-profile-main-title">User Profile</h1>
      </header>

      {/* Profile Header */}
      <div className="user_info">
        <img src="/DSC_1732 (1).jpg" alt="Profile" className="sde-profile-pic" />
        <div>
          <h1 className="sde-profile-name">Ashish Ratna</h1>
          <p className="sde-profile-title">SDE Aspirant</p>
        </div>
      </div>

      {/* SDE Preparation Overview */}
      <Card className="sde-profile-overview-card">
        <Card.Header>
          <Card.Title className="sde-profile-card-title">SDE Preparation Overview</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="sde-profile-overview-content">
            <LineChart className="sde-profile-overview-icon" />
            <div>
              <p>Overall SDE Readiness</p>
              <p>{overallProgress}%</p>
            </div>
          </div>
          <Progress value={overallProgress} className="sde-profile-progress-bg" indicatorClassName="sde-profile-progress-indicator" />
          <div className="sde-profile-overview-footer">
            <div>Next Mock Interview: System Design</div>
            <div>3 days left</div>
          </div>
        </Card.Content>
      </Card>

      {/* SDE Preparation Progress Chart */}
      <Card className="sde-profile-chart-card">
        <Card.Header>
          <Card.Title>SDE Preparation Progress</Card.Title>
        </Card.Header>
        <Card.Content>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sdeProgressData}>
              <CartesianGrid stroke="#e5e5e5" strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="currentLevel" stroke="#0094b3" name="Your Progress" />
              <Line type="monotone" dataKey="targetLevel" stroke="#002f5c" name="Target SDE Level" />
            </LineChart>
          </ResponsiveContainer>
        </Card.Content>
      </Card>

      {/* SDE Skills Dashboard */}
      {/* SDE Skills Dashboard */}
<Card className="sde-profile-skills-card">
  <Card.Header>
    <Card.Title>SDE Skills Dashboard</Card.Title>
  </Card.Header>
  <Card.Content>
    <Tabs defaultValue="algorithms">
      <TabsList className="sde-profile-tabs-list">
        <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
        <TabsTrigger value="data-structures">Data Structures</TabsTrigger>
        <TabsTrigger value="system-design">System Design</TabsTrigger>
      </TabsList>

      {/* Algorithms Tab Content */}
      <TabsContent value="algorithms">
        <div className="sde-profile-skill-item">
          <span>Time Complexity Analysis</span>
          <Progress value={80} className="sde-profile-skill-progress-bg" indicatorClassName="sde-profile-skill-progress-indicator" />
        </div>
        <div className="sde-profile-skill-item">
          <span>Sorting and Searching</span>
          <Progress value={70} className="sde-profile-skill-progress-bg" indicatorClassName="sde-profile-skill-progress-indicator" />
        </div>
        <div className="sde-profile-skill-item">
          <span>Dynamic Programming</span>
          <Progress value={60} className="sde-profile-skill-progress-bg" indicatorClassName="sde-profile-skill-progress-indicator" />
        </div>
      </TabsContent>

      {/* Data Structures Tab Content */}
      <TabsContent value="data-structures">
        <div className="sde-profile-skill-item">
          <span>Arrays and Strings</span>
          <Progress value={85} className="sde-profile-skill-progress-bg" indicatorClassName="sde-profile-skill-progress-indicator" />
        </div>
        <div className="sde-profile-skill-item">
          <span>Trees and Graphs</span>
          <Progress value={75} className="sde-profile-skill-progress-bg" indicatorClassName="sde-profile-skill-progress-indicator" />
        </div>
        <div className="sde-profile-skill-item">
          <span>Hash Tables</span>
          <Progress value={70} className="sde-profile-skill-progress-bg" indicatorClassName="sde-profile-skill-progress-indicator" />
        </div>
      </TabsContent>

      {/* System Design Tab Content */}
      <TabsContent value="system-design">
        <div className="sde-profile-skill-item">
          <span>Scalability</span>
          <Progress value={65} className="sde-profile-skill-progress-bg" indicatorClassName="sde-profile-skill-progress-indicator" />
        </div>
        <div className="sde-profile-skill-item">
          <span>Database Design</span>
          <Progress value={70} className="sde-profile-skill-progress-bg" indicatorClassName="sde-profile-skill-progress-indicator" />
        </div>
        <div className="sde-profile-skill-item">
          <span>API Design</span>
          <Progress value={75} className="sde-profile-skill-progress-bg" indicatorClassName="sde-profile-skill-progress-indicator" />
        </div>
      </TabsContent>
    </Tabs>
  </Card.Content>
</Card>


      {/* AI-Driven SDE Feedback */}
      <Card className="sde-profile-feedback-card">
        <Card.Header>
          <Card.Title>AI-Driven SDE Feedback</Card.Title>
        </Card.Header>
        <Card.Content>
          <p>Here are some areas to focus on:</p>
          <ul className="sde-profile-feedback-list">
            <li>Improve understanding of Red-Black trees</li>
            <li>Focus on scalability in system design</li>
          </ul>
        </Card.Content>
      </Card>

      {/* Footer */}
      <footer className="sde-profile-footer">
        <Button className="sde-profile-footer-icon"><User /></Button>
        <Button className="sde-profile-footer-icon"><Bell /></Button>
        <Button className="sde-profile-footer-icon"><MessageSquare /></Button>
        <Button className="sde-profile-footer-icon"><Cog /></Button>
      </footer>
    </div>
  );
}
