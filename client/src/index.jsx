import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import './index.scss'

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";

import { AuthProvider } from './services/auth.jsx';
import { CheckInProvider } from './services/CheckInProvider.jsx';
import { CheckOutProvider } from './services/CheckOutProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <CheckInProvider>
          <CheckOutProvider>
            <App />
          </CheckOutProvider>
        </CheckInProvider>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
)