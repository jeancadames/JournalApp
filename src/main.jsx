import React from 'react';
import ReactDOM from 'react-dom/client';
import { JorunalApp } from './JorunalApp';
import { BrowserRouter } from "react-router-dom";
import './styles.css';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <JorunalApp />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>
)
