import React, { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
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
      const res = await fetch('/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Usuario registrado con éxito');
        setFormData({ username: '', email: '', password: '' });
      } else {
        setMessage(data.error || 'Error en el registro');
      }
    } catch (err) {
      console.error('Error:', err);
      setMessage('Error en la conexión');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro de Usuario</h2>

      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </label>

      <br />

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <br />

      <label>
        Contraseña:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>

      <br />

      <button type="submit">Registrarse</button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default RegisterForm;
