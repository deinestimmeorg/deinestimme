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
import ZustaendigkeitPage from './pages/ZustaendigkeitPage';
import PasswordGate from './components/PasswordGate';
import LanguageSelector from './components/LanguageSelector';
import DeineStimmeApp from './App';

function LanguageGate({ children }) {
  const [lang, setLang] = React.useState(() => localStorage.getItem('ds_lang'));
  if (!lang) {
    return (
      <LanguageSelector
        onSelect={(code) => {
          localStorage.setItem('ds_lang', code);
          setLang(code);
        }}
      />
    );
  }
  return children;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageGate>
      <PasswordGate>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app/*" element={<DeineStimmeApp />} />
            <Route path="/verstehen" element={<VerstehenPage />} />
            <Route path="/mitbauen" element={<MitbauenPage />} />
            <Route path="/institution" element={<InstitutionPage />} />
            <Route path="/zustaendigkeit" element={<ZustaendigkeitPage />} />
            <Route path="/zustaendigkeit/:query" element={<ZustaendigkeitPage />} />
          </Routes>
        </BrowserRouter>
      </PasswordGate>
    </LanguageGate>
  </React.StrictMode>
);
