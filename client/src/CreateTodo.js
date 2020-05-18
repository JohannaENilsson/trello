import React, { useState } from 'react';

export default function CreateTodo({ listId, addTodo }) {
  const [newTodo, setNewTodo] = useState({
    name: '',
    description: '',
  });
  const [invalidTodo, setInvalidTodo] = useState(false);

  function handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setNewTodo({ ...newTodo, [name]: value });
  }

  function submitTodo(e) {
    e.preventDefault();
    if (newTodo.name.length > 1) {
      addTodo(e, listId, newTodo);

      setTimeout(() => {
        setNewTodo({
          name: '',
          description: '',
        });
      }, 500);
    } else {
      setInvalidTodo(true);
      setTimeout(() => {
        setInvalidTodo(false);
      }, 2500);
    }
  }

  return (
    <form>
      <label>
        Name:
        <input
          minLength='1'
          id={`name_${listId}`}
          type='text'
          name='name'
          placeholder='Name'
          value={newTodo.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Description:
        <input
          id={`description_${listId}`}
          type='text'
          name='description'
          placeholder='Description'
          value={newTodo.description}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={(e) => submitTodo(e)}>Add todo</button>
      {invalidTodo && <p>Todo can't be empty</p>}
    </form>
  );
}
