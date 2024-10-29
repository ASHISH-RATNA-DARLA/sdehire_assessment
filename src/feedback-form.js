import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./feedback-form.css"; // Main CSS file for styling

// Button Component
function Button({ className, children, ...props }) {
  return (
    <button className={`feedback-form-button ${className}`} {...props}>
      {children}
    </button>
  );
}

// Card Component
function Card({ children, className }) {
  return <div className={`feedback-form-card ${className}`}>{children}</div>;
}

Card.Header = ({ children }) => (
  <div className="feedback-form-card-header">{children}</div>
);
Card.Title = ({ children, className }) => (
  <h2 className={`feedback-form-card-title ${className}`}>{children}</h2>
);
Card.Description = ({ children, className }) => (
  <p className={`feedback-form-card-description ${className}`}>{children}</p>
);
Card.Content = ({ children }) => (
  <div className="feedback-form-card-content">{children}</div>
);
Card.Footer = ({ children }) => (
  <div className="feedback-form-card-footer">{children}</div>
);

// Label Component
function Label({ htmlFor, className, children }) {
  return (
    <label htmlFor={htmlFor} className={`feedback-form-label ${className}`}>
      {children}
    </label>
  );
}

// Slider Component
function Slider({ id, name, min, max, step, value, onValueChange, className }) {
  return (
    <input
      id={id}
      name={name}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onValueChange([Number(e.target.value)])}
      className={`feedback-form-slider ${className}`}
    />
  );
}

// RadioGroup Component
function RadioGroup({ id, name, value, onValueChange, children }) {
  return (
    <div id={id} className="feedback-form-radio-group">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          checked: child.props.value === value,
          onChange: () => onValueChange(child.props.value),
        })
      )}
    </div>
  );
}

// RadioGroupItem Component
function RadioGroupItem({ id, value, checked, onChange, label }) {
  return (
    <div className="feedback-form-radio-item-wrapper">
      <input
        type="radio"
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
        className="feedback-form-radio-item"
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}

// Textarea Component
function Textarea({ id, name, value, onChange, className, rows }) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`feedback-form-textarea ${className}`}
      rows={rows}
    ></textarea>
  );
}

// Tooltip Component
function Tooltip({ message }) {
  return (
    <div className="feedback-form-tooltip">
      <span className="feedback-form-tooltip-text">{message}</span>
    </div>
  );
}

// Main Feedback Form Component
export default function StudentFeedbackForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    courseRating: 5,
    instructorRating: 5,
    contentQuality: 5,
    overallSatisfaction: "",
    comments: "",
  });
  const navigate = useNavigate(); // For redirection

  const totalSteps = 4;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSliderChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value[0] }));
  };

  const handleNext = () => {
    setStep((prevStep) => Math.min(prevStep + 1, totalSteps));
  };

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback!");
    navigate("/dashboard"); // Redirect to dashboard after submitting
  };

  return (
    <Card className="feedback-form-card-container">
      <Card.Header>
        <Card.Title>Student Feedback Form</Card.Title>
        <Card.Description>
          Help us improve your educational experience
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="feedback-form-progress-container">
          <div className="feedback-form-progress-bar-bg">
            <div
              className="feedback-form-progress-bar-fill"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
          <p className="feedback-form-progress-text">
            Step {step} of {totalSteps}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="feedback-form-step">
              <div>
                <Label htmlFor="courseRating">Course Rating</Label>
                <Slider
                  id="courseRating"
                  name="courseRating"
                  min={1}
                  max={10}
                  step={1}
                  value={formData.courseRating}
                  onValueChange={(value) =>
                    handleSliderChange("courseRating", value)
                  }
                />
                <div className="feedback-form-slider-value">
                  Selected Value: {formData.courseRating}
                </div>
                <div className="feedback-form-slider-labels">
                  <span>1</span>
                  <span>10</span>
                </div>
              </div>
              <div>
                <Label htmlFor="instructorRating">Instructor Rating</Label>
                <Slider
                  id="instructorRating"
                  name="instructorRating"
                  min={1}
                  max={10}
                  step={1}
                  value={formData.instructorRating}
                  onValueChange={(value) =>
                    handleSliderChange("instructorRating", value)
                  }
                />
                <div className="feedback-form-slider-value">
                  Selected Value: {formData.instructorRating}
                </div>
                <div className="feedback-form-slider-labels">
                  <span>1</span>
                  <span>10</span>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="feedback-form-step">
              <Label htmlFor="contentQuality">Content Quality</Label>
              <Slider
                id="contentQuality"
                name="contentQuality"
                min={1}
                max={10}
                step={1}
                value={formData.contentQuality}
                onValueChange={(value) =>
                  handleSliderChange("contentQuality", value)
                }
              />
              <div className="feedback-form-slider-value">
                Selected Value: {formData.contentQuality}
              </div>
              <div className="feedback-form-slider-labels">
                <span>1</span>
                <span>10</span>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="feedback-form-step">
              <Label htmlFor="overallSatisfaction">Overall Satisfaction</Label>
              <RadioGroup
                id="overallSatisfaction"
                name="overallSatisfaction"
                value={formData.overallSatisfaction}
                onValueChange={(value) =>
                  handleInputChange({
                    target: { name: "overallSatisfaction", value },
                  })
                }
              >
                <RadioGroupItem id="very-satisfied" value="very-satisfied" label="Very Satisfied" />
                <RadioGroupItem id="satisfied" value="satisfied" label="Satisfied" />
                <RadioGroupItem id="neutral" value="neutral" label="Neutral" />
                <RadioGroupItem id="dissatisfied" value="dissatisfied" label="Dissatisfied" />
                <RadioGroupItem id="very-dissatisfied" value="very-dissatisfied" label="Very Dissatisfied" />
              </RadioGroup>
            </div>
          )}

          {step === 4 && (
            <div className="feedback-form-step feedback-form-step-final">
              <Label htmlFor="comments">
                Additional Comments
                <Tooltip message="Please provide any additional feedback or suggestions" />
              </Label>
              <Textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                rows={5}
              />
            </div>
          )}
        </form>
      </Card.Content>
      <Card.Footer>
        {step > 1 && (
          <Button onClick={handleBack} className="feedback-form-back-button">
            <ChevronLeft /> Back
          </Button>
        )}
        {step < totalSteps ? (
          <Button onClick={handleNext} className="feedback-form-next-button">
            Next <ChevronRight />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="feedback-form-submit-button">
            Submit Feedback
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
}
