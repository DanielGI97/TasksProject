import React, { useState } from 'react';

const TaskItem = ({ id, title, description, completed, category, created_date, due_date, resetpatterns, onToggle, token}) => {
    const [checked, setChecked] = useState(completed);

    const handleChecked = () => {
        setChecked(!checked);
        onToggle(id);
    };

    return (
        <div className='card-task'>
            <input
                type='checkbox'
                checked={completed}
                onChange={() => onToggle(id)}
            />
            <span>{title}</span>
            if ({description}) {
                <p>{description}</p>
            }
        </div>
    );
};

export default TaskItem;
/*
const TaskItem2 = ({ id, title, completed, resetpatterns, onToggle }) => {
    return (
      <div>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
        />
        <span>{title}</span>
        <ul>
          {resetpatterns.map(rp => (
            <li key={rp.id}>{rp.pattern}</li>
          ))}
        </ul>
      </div>
    );
  };
  */