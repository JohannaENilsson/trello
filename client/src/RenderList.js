import React, { useState } from 'react';

import CreateTodo from './CreateTodo';
import ItemPopup from './ItemPopup';

function RenderList({ allLists, deleteList, allItems, deleteItem, addTodo, updateItem }) {
  const [showPopup, setShowPopup] = useState(false);
  const [item, setItem] = useState(null);
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
 
  // function handleCloseItemPopup() {
  //   setShowPopup(false);
  //   setItem(null);
  // }

  function handleItemPopup(item) {
    console.log('Clicked on ', item);
    setShowPopup(true);
    setItem(item);
  }
  
  function renderItems(listId) {
    if (!allItems) {
      return <p>Loading...</p>;
    } else if (allItems.length === 0) {
      return <p>You have no todos</p>;
    } else {
      return allItems.map((item) => {
        // get item som matchar list id ---> byt till snyggare
        if (listId === item.listId) {
          return (
            <li key={item.id}>
              <span onClick={() => handleItemPopup(item)}>{item.name}</span>
              <button onClick={(e) => deleteItem(e, item.id)}>X</button>
            </li>
          );
        } else {
          return;
        }
      });
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
          <h2>{list.name}</h2>
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

  return (
    <>
      {listInfo}
      {showPopup ? <ItemPopup item={item} setShowPopup={setShowPopup} updateItem={updateItem}/> : null} 
      {/* handleCloseItemPopup={handleCloseItemPopup} */}
    </>
  );
}

export default RenderList;
