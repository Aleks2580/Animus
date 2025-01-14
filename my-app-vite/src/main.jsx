import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import i18n from "../src/i18n";
import { I18nextProvider } from "react-i18next";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
);


