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
    <><form onSubmit={(e) => submitTodo(e)}>
      <label htmlFor={`name_${listId}`}>
        New todo
        </label>
        <input
          minLength='1'
          id={`name_${listId}`}
          type='text'
          name='name'
          placeholder='New todo'
          value={newTodo.name}
          onChange={handleInputChange}
        />
      
      {/* <label>
        Description:
        <input
          id={`description_${listId}`}
          type='text'
          name='description'
          placeholder='Description'
          value={newTodo.description}
          onChange={handleInputChange}
        />
      </label> */}
      <button type='submit' className="material-icons"><span>add_circle</span></button>
      {invalidTodo && <p>Todo can't be empty</p>}
      </form>
    </>
  );
}
