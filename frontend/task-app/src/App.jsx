import './App.css'
import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import TaskList from './components/TaskList';
import RegisterForm from './components/RegisterForm'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [token, setToken] = useState(localStorage.getItem('access') || null);

  const handleLogin = (accessToken, refreshToken) => {
    localStorage.setItem('access', accessToken);
    localStorage.setItem('refresh', refreshToken);
    setToken(accessToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setToken(null);
  };

  return (
    <Router>

      <header>

        <h1>Task App</h1>
        {token && <button onClick={handleLogout}>Cerrar sesión</button>}

      </header>
      <main>

        <Routes>

          {!token ? (
            <>
              <Route path="/login" element={<LoginForm onLogin={handleLogin} />}></Route>
              <Route path="/register" element={<RegisterForm/>}></Route>
              <Route path="*" element={<Navigate to="/login"></Navigate>}></Route>
            </>           
          ) : (
            <>
              <Route path="/tasks" element={<TaskList token={token} />}></Route>
              <Route path="*" element={<Navigate to="/tasks"></Navigate>}></Route>
            </>
            
          )}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
