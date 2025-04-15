import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app'; // Import your App component
import './index.css'; // Optional: global styles

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);