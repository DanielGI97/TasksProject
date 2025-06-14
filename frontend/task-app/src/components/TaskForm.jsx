import React, { useState, useEffect } from 'react';
import { authFetch } from '../utils/authFetch';

const TaskForm = ({ token, onTaskCreated}) => {
    
    const [formData, setFormData] = useState(() => { 
        return {
            title : '',
            description: '',
            reset_interval: 1,
        }
    });

    /* Lógica para que se recalcule el reset interval cuando se canbia:
    last_date_update y reset_interval. Por si lo cambian en el form. */


/*
    useEffect(() => {
        const lastDate = new Date(formData.last_date_update);
        const addDay = formData.reset_interval * 24 * 60 * 60 * 1000;
        const nextDate = new Date(lastDate.getTime() + addDay).toISOString();
    
        setFormData(prev => ({
            ...prev,
            next_date_update: nextDate
        }));
    }, [formData.reset_interval, formData.last_date_update]);
*/


    const [message, setMessage] = useState('');


    const handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        if (e.target.name === 'reset_interval'){
            value = parseInt(value, 10);
        }
      
        setFormData(prev => ({
          ...prev,
          [name]: value,
        }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('SUBMIT - Se envia la siguiente información: ',formData);
        try {
            const res = await authFetch('api/tasks/',{
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
                setFormData({title: '', description: '', reset_interval: 'daily'});
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
                    Título:
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
                    Actualizar:
                </label><br/>
                <select name='reset_interval' value={formData.reset_interval} onChange={handleChange}>
                    <option value="1">Diario</option>
                    <option value="7">Semanal</option>
                    <option value="30">Mensual</option>
                </select><br/>
                
                <button type="submit">Crear tarea</button>

            </form>
        </>
    );
};

export default TaskForm;