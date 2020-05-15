import React, { useEffect, useState } from 'react';

import CreateTodo from './CreateTodo';

function RenderList({ allLists, deleteList, allItems, deleteItem, addTodo }) {
  // const [newList, setNewList] = useState('New list');
  // const [newListName, setNewListName] = useState('List name');

  // function addTodo(e) {
  //   e.preventDefault();
  //   console.log(newTodo);
  // }

  // function changeListName(e) {
  //   e.preventDefault();
  //   console.log(newList);
  // }

  function renderItems(listId) {
    let itemInfo;
    if (!allItems) {
      return (itemInfo = <p>Loading...</p>);
    } else if (allItems.length === 0) {
      return (itemInfo = <p>You have no todos</p>);
    } else {
      return (itemInfo = allItems.map((item) => {
        // get item som matchar list id
        if (listId === item.listId) {
          return (
            <li key={item.id}>
              <span>{item.name}</span>
              <button onClick={(e) => deleteItem(e, item.id)}>X</button>
              <p>{item.description}</p>
            </li>
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

          <ul>{item}</ul>
          {<CreateTodo listId={list.id} addTodo={addTodo} />}
        </section>
      );
    });
  }

  return <>{listInfo}</>;
}

export default RenderList;
