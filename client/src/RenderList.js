import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RenderList({ allLists, deleteList, allItems }) {
  const [newTodo, setNewTodo] = useState('Add todo');
  const [newList, setNewList] = useState('New list');
  // const [newListName, setNewListName] = useState('List name');

  function addTodo(e) {
    e.preventDefault();
    console.log(newTodo);
  }

  function changeListName(e) {
    e.preventDefault();
    console.log(newList);
  }

  function renderItems(listId) {
    let itemInfo;
    if (!allItems) {
      return (itemInfo = <p>Loading...</p>);
    } else if (allItems.length === 0) {
      return (itemInfo = <p>You have no todos</p>);
    } else {
      return (itemInfo = allItems.map((item) => {
        if (listId === item.listId) {
          return (
            <div key={item.id}>
              <p>{item.name}</p>
              <p>{item.description}</p>
            </div>
          );
        }
      }));
    }
  }

  let listInfo;
  if (!allLists) {
    listInfo = (
      <section className='listContainer message'>
        <p>Loading...</p>
      </section>
    );
  } else if (allLists.length === 0) {
    listInfo = (
      <section className='listContainer message'>
        <p>You don´t have any list</p>
      </section>
    );
  } else {
    listInfo = allLists.map((list) => {
      let item = renderItems(list.id);
      return (
        <section className='listContainer' key={list.id}>
          {list.name}
          <button onClick={(e) => deleteList(e, list.id)}>X</button>
          {/* <form>
            <input
              type='text'
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <button onClick={(e) => changeListName(e)}>Change name</button>
          </form> */}
          {item}

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
