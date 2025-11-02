import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './ThemeContext';
import InterviewPrepApp from './InterviewPrepApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <InterviewPrepApp />
    </ThemeProvider>
  </React.StrictMode>
);

