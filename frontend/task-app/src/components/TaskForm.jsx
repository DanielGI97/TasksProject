import React, { useState } from 'react';

const TaskForm = ({ token, onTaskCreated}) => {
    const [formData, setFormData] = useState({
        title : '',
        description: '',
        reset_interval: 1,
        category: '',

    });

    console.log("El token pasado a taskform:", token);

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (e.target.name === 'reset_interval'){
            value = parseInt(value, 10);
        }else if (e.target.name === 'category'){
            if(value === ''){
                value = null;
            }else{
                value = parseInt(value, 10);
            }
        }
      
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('api/tasks',{
                method : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                body : JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('Tarea creada correctamente.');
                setFormData({title: '', description: '', reset: 'daily'});
                onTaskCreated(data);
            } else {
                setMessage(data.error || 'Error al registrar la tarea');
            }
        } catch (error) {
            console.log('Error al registrar la tarea: ', error);            
            setMessage('Ha habido un error a la hora de crear la tarea.');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Añadir tarea</h2>
                <label>
                    Título
                </label><br/>
                <input
                    type='text'
                    name='title'
                    value={formData.title}
                    placeholder='Título de la tarea'
                    onChange={handleChange}
                    required
                />

                <br/><br/>

                <label>
                    Descripción
                </label><br/>
                {/*
                <input
                    type='text'
                    name='description'
                    value={formData.description}
                    placeholder='Descripción de la tarea'
                    onChange={handleChange}
                />
                */}
                <select name='reset_interval' value={formData.reset} onChange={handleChange}>
                    <option value="1">Diario</option>
                    <option value="7">Semanal</option>
                    <option value="30">Mensual</option>
                </select><br/>

                <select name='category' value={formData.reset} onChange={handleChange}>
                    <option value="">Sin categoría</option>
                    <option value="housework">Tareas del hogar</option>
                    <option value="objectives">Metas</option>
                </select><br/>



                <button type="submit">Crear tarea</button>

            </form>
        </>
    );
};

export default TaskForm;