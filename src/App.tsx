import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PortfolioGenerator from './components/PortfolioGenerator';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PortfolioGenerator />
  </React.StrictMode>
);