import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/api/tasks/', {
      headers: {
        'Authorization': 'Bearer TU_TOKEN',  // JWT o Token de autenticación
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Error:', err));
  }, []);

  const toggleTask = (id) => {
    const updated = tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
  };

  return (
    <div>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          completed={task.completed}
          resetpatterns={task.resetpatterns}
          onToggle={toggleTask}
        />
      ))}
    </div>
  );
};

export default TaskList;