<<<<<<< HEAD
// for main.jsx
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
createRoot(document.getElementById('root')).render(
    <>
        <App />
    </>
)
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
>>>>>>> 5c27d88edcfe6811e44cc4025d419b10daf7be03
