import React from 'react';
import ReactDOM from 'react-dom/client';
import { JorunalApp } from './JorunalApp';
import { BrowserRouter } from "react-router-dom";
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <JorunalApp />
    </React.StrictMode>
  </BrowserRouter>
)
