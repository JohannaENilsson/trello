import React, { useState } from 'react';

import CreateTodo from './CreateTodo';
import ItemPopup from './ItemPopup';

function RenderList({
  allLists,
  deleteList,
  allItems,
  deleteItem,
  addTodo,
  updateItem,
}) {
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

  function handleItemPopup(item) {
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
            <li
              key={item._id}
              className='itemContainer'
              onClick={() => handleItemPopup(item)}
            >
              <span>{item.name}</span>
              <button className='material-icons'>
                <span>edit</span>
              </button>
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
      let item = renderItems(list._id);
      return (
        <section className='listContainer' key={list._id}>
          <h2>{list.name}</h2>
          <button
            onClick={(e) => deleteList(e, list._id)}
            className='material-icons'
          >
            <span>delete</span>
          </button>
          {/* <form>
            <input
              type='text'
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <button onClick={(e) => changeListName(e)}>Change name</button>
          </form> */}

          <ul>{item}</ul>
          {<CreateTodo listId={list._id} addTodo={addTodo} />}
        </section>
      );
    });
  }

  return (
    <>
      {listInfo}
      {showPopup ? (
        <ItemPopup
          item={item}
          setShowPopup={setShowPopup}
          updateItem={updateItem}
          allLists={allLists}
          deleteItem={deleteItem}
        />
      ) : null}
    </>
  );
}

export default RenderList;
