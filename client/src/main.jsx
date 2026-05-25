import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.jsx';
import { LeadProvider } from './context/LeadContext.jsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LeadProvider>
        <Suspense fallback={<div className="route-loader">Preparing surfaces...</div>}>
          <AppRoutes />
        </Suspense>
      </LeadProvider>
    </BrowserRouter>
  </React.StrictMode>
);
