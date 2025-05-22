import { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { authFetch } from '../utils/authFetch';

const TaskList = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorTasks, setErrorTask] = useState(false);
  const [lookTaskForm, setLookTaskForm] = useState(false);

  console.log("El token pasado a TaskList:", token);

  useEffect(() => {
    setLoading(true);
    setErrorTask(false);
    authFetch('/api/tasks/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)){
          setLoading(false);
          setTasks(data);
        }else{
          console.error("Respuesta no válida: ",data);
          setTasks([]);
          setLoading(false);
          setErrorTask(true);
        }
      })
      .catch(err => console.error('Error:', err));
  }, [token]);

  const handleNewTask = (newTask) => {
    setTasks( prev => [...prev, newTask]);
    setLookTaskForm(false);
  }

  const handleDeleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  if (loading) {
    return <div>Cargando tareas...</div>;
  }

  return (
    <div>
      <button onClick={() => setLookTaskForm(!lookTaskForm)}>
        {lookTaskForm ? 'Cancelar' : 'Crear nueva tarea'}
      </button>

      {lookTaskForm && (
        <TaskForm token={token} onTaskCreated={handleNewTask} />
      )}

      {errorTasks ? (
        <div>Ha ocurrido un error con las tareas.</div>
      ) : tasks.length === 0 ? (
        <div>No hay tareas disponibles.</div>
      ) : (
        tasks.map(task => (
          <TaskItem key={task.id} {...task} onDelete={handleDeleteTask} token={token}/>
        ))
      )}
    </div>
  );
};

export default TaskList;