import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Facebook, Github, Linkedin } from 'lucide-react';
import './LoginPage.css';

// Button Component
function Button({ type = 'button', className, children, ...props }) {
  return (
    <button type={type} className={className} {...props}>
      {children}
    </button>
  );
}

// Checkbox Component
function Checkbox({ id, className, ...props }) {
  return <input id={id} type="checkbox" className={className} {...props} />;
}

// Input Component
function Input({ id, type = 'text', className, ...props }) {
  return <input id={id} type={type} className={className} {...props} />;
}

// Label Component
function Label({ htmlFor, className, children }) {
  return <label htmlFor={htmlFor} className={className}>{children}</label>;
}

// LoginPage Component
export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard'); // Redirect to dashboard after sign-in
  };

  return (
    <div className="login-page-container">
      <div className="login-page-content">
        <img src="/logo.png" alt="Logo" className="login-page-logo" /> {/* Logo image */}
        <h2 className="login-page-heading">Sign in to your account</h2>
        <form className="login-page-form" onSubmit={handleLogin}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="login-page-input-container">
            <Label htmlFor="email-address" className="login-page-sr-only">
              Email address
            </Label>
            <Input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="login-page-input"
              placeholder="Email address"
              defaultValue="sentiantal@gmail.com"
            />
            <Label htmlFor="password" className="login-page-sr-only">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="login-page-input"
              placeholder="Password"
              defaultValue="1234"
            />
          </div>

          <div className="login-page-form-group">
            <div className="login-page-checkbox-group">
              <Checkbox id="remember-me" className="login-page-checkbox" />
              <Label htmlFor="remember-me" className="login-page-remember-me-label">
                Remember me
              </Label>
            </div>
            <Link to="#" className="login-page-link">Forgot your password?</Link>
          </div>

          <div>
            <Button type="submit" className="login-page-button">Sign in</Button>
          </div>
        </form>

        <div className="login-page-divider">
          <div className="login-page-divider-line"></div>
          <span className="login-page-divider-text">Or continue with</span>
        </div>

        <div className="login-page-social-buttons">
          <Button className="login-page-social-button">
            <Facebook className="h-5 w-5" />
          </Button>
          <Button className="login-page-social-button">
            <Github className="h-5 w-5" />
          </Button>
          <Button className="login-page-social-button">
            <Linkedin className="h-5 w-5" />
          </Button>
        </div>

        <p className="login-page-sign-up">
          Or{' '}
          <Link to="#" className="login-page-link">
            sign up for a new account
          </Link>
        </p>
      </div>
    </div>
  );
}
