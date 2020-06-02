import React, { useState } from 'react';

import CreateTodo from './CreateTodo';
import ItemPopup from './ItemPopup';
import ListPopup from './ListPopup';

function RenderList({
  allLists,
  deleteList,
  allItems,
  deleteItem,
  addTodo,
  updateItem,
  changeListName,
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [showListPopup, setShowListPopup] = useState(false);
  const [item, setItem] = useState(null);
  const [list, setList] = useState(null);

  function handleListPopup(name) {
    setShowListPopup(true);
    setList(name);
  }

  function handleItemPopup(item) {
    setShowPopup(true);
    setItem(item);
  }

  function deactivateModal() {
    setShowPopup(false);
    setShowListPopup(false);
  }

  function renderItems(listId) {
    if (!allItems) {
      return <p>Loading...</p>;
    } else if (allItems.length === 0) {
      return <p>You have no todos</p>;
    } else {
      return allItems.map((item) => {
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
          <h2
            onClick={() => handleListPopup(list)}
            style={{ cursor: 'pointer' }}
          >
            {list.name}
          </h2>
          <button
            onClick={() => handleListPopup(list)}
            className='material-icons'
          >
            <span>edit</span>
          </button>

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
          updateItem={updateItem}
          allLists={allLists}
          deleteItem={deleteItem}
          deactivateModal={deactivateModal}
        />
      ) : null}
      {showListPopup ? (
        <ListPopup
          list={list}
          changeListName={changeListName}
          deleteList={deleteList}
          deactivateModal={deactivateModal}
        />
      ) : null}
    </>
  );
}

export default RenderList;
