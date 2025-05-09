import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        setMessage('Sesión iniciada');
        onLogin(data.access, data.refresh);  // Puedes levantar el estado hacia App
      } else {
        setMessage(data.detail || 'Error al iniciar sesión');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error de red');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <label>
          Username:
          <input type="text" name="username" onChange={handleChange} required />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" name="password" onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
      <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
    </div>
  );
};

export default LoginForm;