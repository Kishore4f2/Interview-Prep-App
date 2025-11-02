import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { useTheme } from "./ThemeContext";
import ThemeToggle from "./ThemeToggle";

const domains = ["HR", "Technical", "Aptitude", "Logical"];

function useVoiceRecorder(onStop) {
  const mediaRecorder = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      let chunks = [];
      mediaRecorder.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        chunks = [];
        onStop(blob);
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Please allow microphone access to use voice recording.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  return { isRecording, startRecording, stopRecording };
}

export default function InterviewPrepApp() {
  const { actualTheme } = useTheme();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [domain, setDomain] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [pdfReport, setPdfReport] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const { isRecording, startRecording, stopRecording } = useVoiceRecorder(
    (audioBlob) => {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = () => {
        const voiceAnswerText = "Simulated voice answer text based on your recording.";
        setAnswer(voiceAnswerText);
      };
    }
  );

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    if (question) {
      setTimer(0);
      setIsTimerRunning(true);
    }
  }, [question]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  function handleLogin() {
    if (username && password) {
      setUserInfo({ name: username, email: `${username}@example.com`, provider: 'email' });
      setLoggedIn(true);
    }
  }

  function handleSignup() {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    // Simulated signup - In production, integrate with backend API
    setUserInfo({ name: name, email: email, provider: 'email' });
    setLoggedIn(true);
    console.log("Signup successful - In production, save user to database");
  }

  function handleGoogleLogin() {
    // Simulated Google OAuth - In production, integrate with Google OAuth 2.0
    const mockUser = {
      name: "John Doe",
      email: "john.doe@gmail.com",
      provider: 'google',
      picture: "https://via.placeholder.com/40"
    };
    setUserInfo(mockUser);
    setLoggedIn(true);
    console.log("Google Login - In production, implement Google OAuth 2.0");
  }

  function handleLinkedInLogin() {
    // Simulated LinkedIn OAuth - In production, integrate with LinkedIn OAuth 2.0
    const mockUser = {
      name: "Jane Smith",
      email: "jane.smith@linkedin.com",
      provider: 'linkedin',
      picture: "https://via.placeholder.com/40"
    };
    setUserInfo(mockUser);
    setLoggedIn(true);
    console.log("LinkedIn Login - In production, implement LinkedIn OAuth 2.0");
  }

  function handleLogout() {
    setLoggedIn(false);
    setUserInfo(null);
    setDomain("");
    setQuestion("");
    setAnswer("");
    setFeedback(null);
    setPdfReport(null);
    setTimer(0);
    setIsTimerRunning(false);
  }

  function handleDomainSelect(e) {
    const selected = e.target.value;
    setDomain(selected);
    setAnswer("");
    setFeedback(null);
    setPdfReport(null);
    setTimer(0);
    setIsTimerRunning(false);

    const dummyQuestions = {
      HR: "Tell me about yourself. Walk me through your background and what led you to pursue this role.",
      Technical: "Explain polymorphism in Object-Oriented Programming. Provide examples of how it's used in real-world applications.",
      Aptitude: "What is the next number in the sequence: 2, 4, 8, 16? Explain your reasoning.",
      Logical: "If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies? Justify your answer.",
    };

    setQuestion(dummyQuestions[selected] || "");
  }

  function evaluateAnswer() {
    if (!answer) return;
    setIsTimerRunning(false);
    
    // Simulate AI-powered evaluation
    const simulatedFeedback = {
      score: {
        Communication: Math.floor(Math.random() * 3) + 7,
        Confidence: Math.floor(Math.random() * 3) + 6,
        TechnicalSkill: domain === "Technical" ? Math.floor(Math.random() * 3) + 7 : null,
        Clarity: Math.floor(Math.random() * 3) + 7,
      },
      suggestions: [
        "Try to structure your answer with clear points and examples.",
        "Consider providing more specific details to strengthen your response.",
        "Work on maintaining a confident tone throughout your answer.",
        "Practice speaking more concisely while covering all key points."
      ][Math.floor(Math.random() * 4)],
      timeTaken: formatTime(timer)
    };
    setFeedback(simulatedFeedback);
  }

  function generateReport() {
    if (!feedback) return;
    const reportContent = `
╔══════════════════════════════════════════════════════╗
║     INTERVIEW PREPARATION REPORT                     ║
╚══════════════════════════════════════════════════════╝

Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}
Domain: ${domain}
Time Taken: ${feedback.timeTaken}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

QUESTION:
${question}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

YOUR ANSWER:
${answer}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PERFORMANCE SCORES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Communication:     ${feedback.score.Communication}/10
Confidence:        ${feedback.score.Confidence}/10
Clarity:           ${feedback.score.Clarity}/10
${domain === "Technical" ? `Technical Skill:   ${feedback.score.TechnicalSkill}/10` : ""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUGGESTIONS FOR IMPROVEMENT:
${feedback.suggestions}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generated by Interview Preparation System
`;
    const blob = new Blob([reportContent], { type: "text/plain" });
    setPdfReport(URL.createObjectURL(blob));
  }

  if (!loggedIn) {
    return (
      <div className="app-wrapper">
        <div className="login-page">
          <div className="login-header">
            <ThemeToggle />
          </div>
          <div className="login-container">
            <div className="login-brand">
              <h1 className="login-title">Interview Simulator</h1>
              <p className="login-subtitle">Practice and perfect your interview skills with AI-powered feedback</p>
            </div>

            <div className="auth-toggle">
              <button
                className={`auth-toggle-btn ${!isSignUp ? 'active' : ''}`}
                onClick={() => {
                  setIsSignUp(false);
                  setName("");
                  setEmail("");
                  setUsername("");
                  setPassword("");
                  setConfirmPassword("");
                }}
              >
                Sign In
              </button>
              <button
                className={`auth-toggle-btn ${isSignUp ? 'active' : ''}`}
                onClick={() => {
                  setIsSignUp(true);
                  setUsername("");
                  setPassword("");
                  setConfirmPassword("");
                }}
              >
                Sign Up
              </button>
            </div>
            
            <div className="login-form">
              <div className="social-login-section">
                <button className="social-btn google-btn" onClick={handleGoogleLogin}>
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.96-2.184l-2.908-2.258c-.806.54-1.837.86-3.052.86-2.347 0-4.33-1.584-5.038-3.71H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                    <path fill="#FBBC05" d="M3.962 10.708c-.18-.54-.282-1.117-.282-1.708s.102-1.168.282-1.708V4.95H.957C.348 6.174 0 7.55 0 9s.348 2.826.957 4.05l3.005-2.342z"/>
                    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.95l3.005 2.342C4.67 5.164 6.653 3.58 9 3.58z"/>
                  </svg>
                  Continue with Google
                </button>
                
                <button className="social-btn linkedin-btn" onClick={handleLinkedInLogin}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                    <path d="M16.447 0H1.553C.695 0 0 .695 0 1.553v14.894C0 17.305.695 18 1.553 18h14.894C17.305 18 18 17.305 18 16.447V1.553C18 .695 17.305 0 16.447 0zM5.362 15.234H2.766V6.797h2.596v8.437zM4.064 5.71c-.832 0-1.508-.676-1.508-1.508s.676-1.508 1.508-1.508 1.508.676 1.508 1.508-.676 1.508-1.508 1.508zm11.17 9.524h-2.596v-4.11c0-.996-.018-2.277-1.388-2.277-1.39 0-1.603 1.086-1.603 2.205v4.182H7.047V6.797h2.492v1.13h.035c.318-.602 1.096-1.237 2.256-1.237 2.414 0 2.861 1.59 2.861 3.658v4.988z"/>
                  </svg>
                  Continue with LinkedIn
                </button>
              </div>
              
              <div className="divider">
                <span>OR</span>
              </div>
              
              {isSignUp ? (
                <>
                  <input
                    className="input-field"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="input-field"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="input-field"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    className="input-field"
                    placeholder="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button className="btn btn-primary" onClick={handleSignup}>
                Create Account
              </button>
                </>
              ) : (
                <>
                  <input
                    className="input-field"
                    placeholder="Email or Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    className="input-field"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="btn btn-primary" onClick={handleLogin}>
                    Sign In
                  </button>
                </>
              )}
            </div>
            
            <p className="login-footer">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-content">
          <div className="header-brand">
            <h1 className="app-logo">Interview Simulator</h1>
          </div>
          <div className="header-actions">
            {userInfo && (
              <div className="user-info">
                {userInfo.picture && (
                  <img src={userInfo.picture} alt={userInfo.name} className="user-avatar" />
                )}
                <span className="user-name">{userInfo.name}</span>
              </div>
            )}
            <ThemeToggle />
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="simulator-container">
          <div className="simulator-sidebar">
            <div className="sidebar-section">
              <h3 className="sidebar-title">Select Interview Type</h3>
              <select
                className="domain-select"
                onChange={handleDomainSelect}
                value={domain}
              >
                <option value="">Choose a domain...</option>
                {domains.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {question && (
              <div className="sidebar-section">
                <div className="timer-display">
                  <span className="timer-label">Time</span>
                  <span className="timer-value">{formatTime(timer)}</span>
                </div>
              </div>
            )}

            {feedback && (
              <div className="sidebar-section">
                <h3 className="sidebar-title">Your Score</h3>
                <div className="score-summary">
                  <div className="score-item">
                    <span className="score-label">Overall</span>
                    <span className="score-value">
                      {Math.round(
                        (feedback.score.Communication +
                          feedback.score.Confidence +
                          feedback.score.Clarity +
                          (feedback.score.TechnicalSkill || 0)) /
                          (domain === "Technical" ? 4 : 3)
                      )}/10
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="simulator-main">
            {!question ? (
              <div className="welcome-screen">
                <div className="welcome-icon">🎯</div>
                <h2>Welcome to Interview Simulator</h2>
                <p>Select an interview domain from the sidebar to begin your practice session.</p>
                <div className="domain-cards">
                  {domains.map((d) => (
                    <div key={d} className="domain-card" onClick={() => {
                      const event = { target: { value: d } };
                      handleDomainSelect(event);
                    }}>
                      <div className="domain-icon">{d === "HR" ? "👔" : d === "Technical" ? "💻" : d === "Aptitude" ? "🧮" : "🧩"}</div>
                      <h3>{d}</h3>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="question-card">
                  <div className="question-header">
                    <span className="question-badge">{domain}</span>
                    <span className="question-number">Question 1</span>
                  </div>
                  <h2 className="question-text">{question}</h2>
                </div>

                <div className="answer-section">
                  <label className="answer-label">Your Answer</label>
                  <textarea
                    className="answer-textarea"
                    rows={8}
                    placeholder="Type or speak your answer here. Be detailed and specific..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  
                  <div className="answer-actions">
                    <div className="voice-controls">
                      {!isRecording ? (
                        <button className="btn btn-voice" onClick={startRecording}>
                          <span className="btn-icon">🎤</span>
                          Start Voice Input
                        </button>
                      ) : (
                        <button className="btn btn-voice-recording" onClick={stopRecording}>
                          <span className="recording-indicator"></span>
                          Stop Recording
                        </button>
                      )}
                    </div>
                    
                    <button 
                      className="btn btn-submit" 
                      onClick={evaluateAnswer}
                      disabled={!answer.trim()}
                    >
                      Submit Answer
                    </button>
                  </div>
                </div>
              </>
            )}

            {feedback && (
              <div className="feedback-panel">
                <div className="feedback-header">
                  <h3>Performance Analysis</h3>
                  <span className="feedback-time">Time: {feedback.timeTaken}</span>
                </div>
                
                <div className="feedback-scores-grid">
                  <div className="score-card">
                    <div className="score-card-header">
                      <span className="score-icon">💬</span>
                      <span className="score-name">Communication</span>
                    </div>
                    <div className="score-bar-container">
                      <div 
                        className="score-bar" 
                        style={{ width: `${feedback.score.Communication * 10}%` }}
                      ></div>
                    </div>
                    <span className="score-number">{feedback.score.Communication}/10</span>
                  </div>

                  <div className="score-card">
                    <div className="score-card-header">
                      <span className="score-icon">✨</span>
                      <span className="score-name">Confidence</span>
                    </div>
                    <div className="score-bar-container">
                      <div 
                        className="score-bar" 
                        style={{ width: `${feedback.score.Confidence * 10}%` }}
                      ></div>
                    </div>
                    <span className="score-number">{feedback.score.Confidence}/10</span>
                  </div>

                  <div className="score-card">
                    <div className="score-card-header">
                      <span className="score-icon">📝</span>
                      <span className="score-name">Clarity</span>
                    </div>
                    <div className="score-bar-container">
                      <div 
                        className="score-bar" 
                        style={{ width: `${feedback.score.Clarity * 10}%` }}
                      ></div>
                    </div>
                    <span className="score-number">{feedback.score.Clarity}/10</span>
                  </div>

                  {domain === "Technical" && feedback.score.TechnicalSkill && (
                    <div className="score-card">
                      <div className="score-card-header">
                        <span className="score-icon">⚙️</span>
                        <span className="score-name">Technical Skill</span>
                      </div>
                      <div className="score-bar-container">
                        <div 
                          className="score-bar" 
                          style={{ width: `${feedback.score.TechnicalSkill * 10}%` }}
                        ></div>
                      </div>
                      <span className="score-number">{feedback.score.TechnicalSkill}/10</span>
                    </div>
                  )}
                </div>

                <div className="feedback-suggestions">
                  <h4 className="suggestions-title">💡 Suggestions for Improvement</h4>
                  <p className="suggestions-text">{feedback.suggestions}</p>
                </div>

                <div className="feedback-actions">
                  <button className="btn btn-report" onClick={generateReport}>
                    📄 Generate Report
                  </button>
                  {pdfReport && (
                    <a 
                      href={pdfReport} 
                      download="Interview_Summary_Report.txt"
                      className="btn btn-download"
                    >
                      📥 Download Report
                    </a>
                  )}
                  <button 
                    className="btn btn-restart" 
                    onClick={() => {
                      setQuestion("");
                      setAnswer("");
                      setFeedback(null);
                      setPdfReport(null);
                      setTimer(0);
                      setIsTimerRunning(false);
                    }}
                  >
                    🔄 Try Another Question
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
