import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Local fonts (DSGVO-konform, no Google CDN)
import '@fontsource/dm-mono/300.css';
import '@fontsource/dm-mono/400.css';
import '@fontsource/crimson-pro/300.css';
import '@fontsource/crimson-pro/400.css';
import '@fontsource/crimson-pro/600.css';

import LandingPage from './pages/LandingPage';
import VerstehenPage from './pages/VerstehenPage';
import MitbauenPage from './pages/MitbauenPage';
import InstitutionPage from './pages/InstitutionPage';
import PasswordGate from './components/PasswordGate';
import DeineStimmeApp from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PasswordGate>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app/*" element={<DeineStimmeApp />} />
          <Route path="/verstehen" element={<VerstehenPage />} />
          <Route path="/mitbauen" element={<MitbauenPage />} />
          <Route path="/institution" element={<InstitutionPage />} />
        </Routes>
      </BrowserRouter>
    </PasswordGate>
  </React.StrictMode>
);
