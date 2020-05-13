import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [newTodo, setNewTodo] = useState('Add todo');
  const [newList, setNewList] = useState('New list');
  const [newListName, setNewListName] = useState('List name')

  useEffect(() => {
    axios
      .get('http://localhost:8090/lists')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function addTodo(e) {
    e.preventDefault();
    console.log(newTodo);
  }

  function createNewList(e) {
    e.preventDefault();
    console.log(newList);
  }

  function changeListName(e) {
    e.preventDefault();
    console.log(newList);
  }

  return (
    <div className='App'>
      <header>Organize</header>
      <main className='board'>
        <section className='listContainer'>
          I´m a list container
          <form onClick={(e) => changeListName(e)}>
          <input type='text' value={newListName} onChange={(e) => setNewListName(e.target.value)}/>
          <button>Change name</button>
          </form>
          <ul>
            <li>Item / Todo</li>
            <li>Item / Todo</li>
            <li>Item / Todo / Item / Todo / Item / Todo</li>
          </ul>
          <form onClick={(e) => addTodo(e)} >
            <input
              type='text'
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button>Add todo</button>
          </form>
        </section>

        <section className='listContainer'>
          Create a new list
          <form onClick={(e) => createNewList(e)}>
            <input
              type='text'
              value={newList}
              onChange={(e) => setNewList(e.target.value)}
            />
            <button>Add new list</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
