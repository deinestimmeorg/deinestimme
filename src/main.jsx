import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Local fonts (DSGVO-konform, no Google CDN)
import '@fontsource/dm-mono/300.css';
import '@fontsource/dm-mono/400.css';
import '@fontsource/crimson-pro/300.css';
import '@fontsource/crimson-pro/400.css';
import '@fontsource/crimson-pro/600.css';

import LandingPage from './pages/LandingPage';
import LanguageSelector from './components/LanguageSelector';
import PasswordGate from './components/PasswordGate';
import DeineStimmeApp from './App';

function AppRoute() {
  const [lang, setLang] = useState(() => localStorage.getItem("ds_lang"));

  const handleLanguage = (code) => {
    localStorage.setItem("ds_lang", code);
    setLang(code);
  };

  if (!lang) {
    return <LanguageSelector onSelect={handleLanguage} />;
  }

  return (
    <PasswordGate>
      <DeineStimmeApp />
    </PasswordGate>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app/*" element={<AppRoute />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
