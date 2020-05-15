import React, { useState } from 'react';

export default function CreateTodo({ listId, addTodo }) {
  const [newTodo, setNewTodo] = useState({
    name: 'name',
    description: 'description',
  });
  function handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setNewTodo({ ...newTodo, [name]: value });
  }

  return (
    <form onClick={(e) => addTodo(e, listId, newTodo)}>
      <input
        id={`name_${listId}`}
        type='text'
        name='name'
        value={newTodo.name}
        onChange={handleInputChange}
      />
      <input
        id={`description_${listId}`}
        type='text'
        name='description'
        value={newTodo.description}
        onChange={handleInputChange}
      />
      <button>Add todo</button>
    </form>
  );
}
