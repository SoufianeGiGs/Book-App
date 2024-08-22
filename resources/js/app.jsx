import React from 'react';
import ReactDOM from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../css/app.css';
import './Pages/Login'; // Add this temporarily


createInertiaApp({
  resolve: (name) => import(`./Pages/${name}.jsx`).then((module) => module.default),
  setup({ el, App, props }) {
    const root = ReactDOM.createRoot(el);
    root.render(
      <Router>
        <App {...props} />
      </Router>
    );
  },
});
