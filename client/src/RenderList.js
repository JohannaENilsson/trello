import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RenderList({ allLists, deleteList }) {
  const [newTodo, setNewTodo] = useState('Add todo');
  const [newList, setNewList] = useState('New list');
  const [newListName, setNewListName] = useState('List name');

  function addTodo(e) {
    e.preventDefault();
    console.log(newTodo);
  }

  function changeListName(e) {
    e.preventDefault();
    console.log(newList);
  }



  let listInfo;
  if (!allLists) {
    listInfo = <p>You don´t have any lists</p>;
  } else {
    listInfo = allLists.map((list) => {
      return (
        <section className='listContainer' key={list.id}>
          {list.name}
          <button onClick={(e) => deleteList(e, list.id)}>Delete list</button>
          {/* <form>
            <input
              type='text'
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <button onClick={(e) => changeListName(e)}>Change name</button>
          </form> */}
          <ul>
            <li>Item / Todo</li>
            <li>Item / Todo</li>
            <li>Item / Todo / Item / Todo / Item / Todo</li>
          </ul>
          <form>
            <input
              type='text'
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button onClick={(e) => addTodo(e)}>Add todo</button>
          </form>
        </section>
      );
    });
  }

  return <>{listInfo}</>;
}

export default RenderList;
