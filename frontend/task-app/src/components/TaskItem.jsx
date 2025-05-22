import React, { useState } from 'react';
import { FcFullTrash } from "react-icons/fc";
import { AiFillEdit } from "react-icons/ai";
import { authFetch } from '../utils/authFetch';

const TaskItem = ({ id, title, description, completed, category, created_date, reset_interval, last_date_update, next_date_update, onDelete, token}) => {
    const [checked, setChecked] = useState(completed);
    const [updating, setUpdating] = useState(false);
    const [lookModify, setLookModify] = useState(false);
    const [formUpdate, setFormUpdate] = useState({
            title : title,
            description: '',
            completed: completed,
            reset_interval: reset_interval,
            category: category,
            last_date_update: last_date_update,
            next_date_update: next_date_update,
        });

    const handleChecked = async () => {
        setChecked(prev => !prev);
        setUpdating(true);
        /*onToggle(id);*/

        try {
          const res = await authFetch(`api/task/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({completed: !checked}),
          });

          if (!res.ok){
            console.error = 'Error al actualizar la tarea';
            setChecked(prev => !prev);
          }
        } catch (error) {
          console.error('Error al hacer PATCH:', error);
          setChecked(prev => !prev); // Revertir visualmente si falla
        } finally {
          setUpdating(false);
        }


    };

    const handleDelete = async () => {
      try {
        const res = await authFetch(`api/task/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({id: id}),
        });

        if (res.ok) {
          onDelete(id);  // Llamada al padre para quitarla del estado
        } else {
          console.error('Error al eliminar la tarea');
        }
      } catch (error) {
        console.error('Error al hacer DELETE:', error);
      } finally {
        setUpdating(false);
      }
    }

    const handleModify = async () => {
      setLookModify(!lookModify);

    }

    return (
      <>
        {/*Comprobamos si quiere modificar o no la información de la Task.*/}
        { lookModify ? (
          /*En caso de que sí, se pondrán */
          <div className='card-task'>
            <input
                type='text'
                value={title}
                disabled={updating}
                onChange={(e) => handleChecked}
            />
            <button
              onClick={handleModify}
            >Confirmar</button>
            <button
              onClick={()=>{setLookModify(false)}}
            >Cancelar</button>
              
          </div> 
          ): (
          <div className='card-task'>
            <input
                type='checkbox'
                checked={checked}
                disabled={updating}
                onChange={handleChecked}
            />
            <span>{title}</span>
            <button
              onClick={handleDelete}
            ><FcFullTrash /></button>
            <button
              onClick={handleModify}
            ><AiFillEdit /></button>
            
          </div>
        )}
      </>
        
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