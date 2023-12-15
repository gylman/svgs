import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import SVG from './components/SVG.jsx';

document.getElementById('root') &&
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <SVG />
    </React.StrictMode>
  );
