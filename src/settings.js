import React, { useState } from 'react';
import { Bell, Lock, User, Laptop, Menu } from 'lucide-react';
import Sidebar from './Sidebar'; // Assuming Sidebar component is in the same directory
import './settings.css'; // Separate CSS for styling

const Button = ({ children, onClick, className }) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
);

const Input = ({ id, placeholder, className, type = "text" }) => (
  <input id={id} type={type} placeholder={placeholder} className={className} />
);

const Label = ({ htmlFor, children, className }) => (
  <label htmlFor={htmlFor} className={className}>
    {children}
  </label>
);

const Select = ({ children }) => <div className="select-container">{children}</div>;

const SelectTrigger = ({ children, onClick, className, id }) => (
  <div className={className} id={id} onClick={onClick}>
    {children}
  </div>
);

const SelectContent = ({ children, isVisible }) => (
  <div className={`select-content ${isVisible ? "visible" : ""}`}>{children}</div>
);

const SelectItem = ({ value, onClick, children }) => (
  <div className="select-item" data-value={value} onClick={onClick}>
    {children}
  </div>
);

const Switch = ({ id }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div
      className={`switch ${checked ? 'checked' : ''}`}
      onClick={() => setChecked(!checked)}
      id={id}
    >
      <div className="switch-indicator"></div>
    </div>
  );
};

export default function Settings() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isProfileVisibilityOpen, setIsProfileVisibilityOpen] = useState(false);
  const [isScreenReaderOpen, setIsScreenReaderOpen] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState("Select option");
  const [screenReaderCompatibility, setScreenReaderCompatibility] = useState("Select option");

  const handleSave = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  const toggleDropdown = (dropdownSetter) => {
    dropdownSetter((prevState) => !prevState);
  };

  const handleSelectItem = (setValue, setDropdown, value) => {
    setValue(value);
    setDropdown(false);
  };

  return (
    <div className="settings-container">
      <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />

      <header className="settings-header">
        <Button onClick={toggleSidebar} className="menu-button">
          <Menu className="menu-icon" />
        </Button>
        <h1 className="header-title">Settings</h1>
      </header>

      <div className="settings-card">

        <div className="sections">
          <section className="settings-section">
            <h2 className="section-title">
              <User className="icon" />
              Account Settings
            </h2>
            <div className="section-content">
              <Label htmlFor="name" className="label">Name</Label>
              <Input id="name" placeholder="Enter your name" className="input" />
              <Label htmlFor="email" className="label">Student Email</Label>
              <Input id="email" type="email" placeholder="Enter your student email" className="input" />
              <Label htmlFor="student-id" className="label">Student ID</Label>
              <Input id="student-id" placeholder="Enter your student ID" className="input" />
            </div>
          </section>

          <section className="settings-section">
            <h2 className="section-title">
              <Lock className="icon" />
              Privacy Settings
            </h2>
            <div className="section-content">
              <Label htmlFor="profile-visibility" className="label">Profile Visibility</Label>
              <Select>
                <SelectTrigger
                  id="profile-visibility"
                  className="select-trigger"
                  onClick={() => toggleDropdown(setIsProfileVisibilityOpen)}
                >
                  {profileVisibility}
                </SelectTrigger>
                <SelectContent isVisible={isProfileVisibilityOpen}>
                  <SelectItem value="All Students" onClick={() => handleSelectItem(setProfileVisibility, setIsProfileVisibilityOpen, "All Students")}>
                    All Students
                  </SelectItem>
                  <SelectItem value="Classmates Only" onClick={() => handleSelectItem(setProfileVisibility, setIsProfileVisibilityOpen, "Classmates Only")}>
                    Classmates Only
                  </SelectItem>
                  <SelectItem value="Private" onClick={() => handleSelectItem(setProfileVisibility, setIsProfileVisibilityOpen, "Private")}>
                    Private
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="Data_Sharing_label">
              <Label htmlFor="data-sharing" className="label">Academic Data Sharing</Label>
              <Switch id="data-sharing" /></div>
              <div className="alert privacy-alert">
                <p>Important Privacy Notice</p>
                <p>Your academic privacy is protected under FERPA. Changing these settings may affect how your information is shared within the institution.</p>
              </div>
            </div>
          </section>

          <section className="settings-section">
            <h2 className="section-title">
              <Bell className="icon" />
              Notification Settings
            </h2>
            <div className="section-content">
              <div className="notification_toggles">
              <Label htmlFor="email-notifications" className="label">Email Notifications</Label>
              <Switch id="email-notifications" />
              <Label htmlFor="push-notifications" className="label">Push Notifications</Label>
              <Switch id="push-notifications" />
              </div>
              <div className="alert notification-alert">
                <p>Tip: Stay on top of your academic schedule by enabling notifications for assignment due dates and exam reminders.</p>
              </div>
            </div>
          </section>

          <section className="settings-section">
            <h2 className="section-title">
              <Laptop className="icon" />
              Accessibility Settings
            </h2>
            <div className="section-content">
            <div className="notification_toggles">
              <Label htmlFor="font-size" className="label">Larger Font Size</Label>
              <Switch id="font-size" />
              <Label htmlFor="high-contrast" className="label">High Contrast Mode</Label>
              <Switch id="high-contrast" />
                </div>
              <Label htmlFor="screen-reader" className="label">Screen Reader Compatibility</Label>
              <Select>
                <SelectTrigger
                  id="screen-reader"
                  className="select-trigger"
                  onClick={() => toggleDropdown(setIsScreenReaderOpen)}
                >
                  {screenReaderCompatibility}
                </SelectTrigger>
                <SelectContent isVisible={isScreenReaderOpen}>
                  <SelectItem value="Optimized" onClick={() => handleSelectItem(setScreenReaderCompatibility, setIsScreenReaderOpen, "Optimized")}>
                    Optimized
                  </SelectItem>
                  <SelectItem value="Standard" onClick={() => handleSelectItem(setScreenReaderCompatibility, setIsScreenReaderOpen, "Standard")}>
                    Standard
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>
        </div>

        <div className="action-buttons">
          <Button className="cancel-button">Cancel</Button>
          <Button className="save-button" onClick={handleSave}>Save Changes</Button>
        </div>

        {showSuccessMessage && (
          <div className="success-alert">
            Your settings have been updated successfully!
          </div>
        )}
      </div>
    </div>
  );
}
