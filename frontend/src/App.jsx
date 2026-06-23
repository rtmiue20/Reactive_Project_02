import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ArenaPage from './pages/ArenaPage';
import LoginPage from './pages/LoginPage';
import './styles/global.css';

function App() {
  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (t) => {
    setToken(t);
    setLoggedIn(true);
  };

  if (!loggedIn) return <LoginPage onLogin={handleLogin} />;

  return (
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <TopBar token={token} onTokenChange={setToken} />
          <ArenaPage token={token} />
        </div>
      </div>
  );
}

export default App;