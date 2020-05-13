import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

import RenderList from './RenderList';

function App() {
  const [newTodo, setNewTodo] = useState('Add todo');
  const [newList, setNewList] = useState('New list');
  const [newListName, setNewListName] = useState('List name');
  const [allLists, setAllLists] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8090/lists')
      .then((res) => {
        console.log(res.data);
        setAllLists(res.data);
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

    axios
      .post('http://localhost:8090/lists', { name: newList })
      .then((res) => {
        console.log(res.data);
        setAllLists([...allLists, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  console.log(allLists);
  function changeListName(e) {
    e.preventDefault();
    console.log(newList);
  }

  return (
    <div className='App'>
      <header>Organize</header>
      <main className='board'>
        <RenderList allLists={allLists} />

        <section className='listContainer'>
          Create a new list
          <form>
            <input
              type='text'
              value={newList}
              onChange={(e) => setNewList(e.target.value)}
            />
            <button onClick={(e) => createNewList(e)}>Add new list</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
