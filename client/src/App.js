import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './style/style.scss';

import RenderList from './RenderList';
import CreateList from './CreateList';
import Header from './Header';
import Footer from './Footer';

function App() {
  const [newList, setNewList] = useState('');
  const [allLists, setAllLists] = useState(null);
  const [allItems, setAllItems] = useState(null);
  const [invalidListName, setInvalidListName] = useState(false);
  const [invalidListAmount, setInvalidListAmount] = useState(false);

  useEffect(() => {
    axios
      .get('/lists')
      .then((res) => {
        // console.log(res.data);
        setAllLists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get('/items')
      .then((res) => {
        // console.log('items ', res.data);
        setAllItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function addTodo(e, id, newTodo) {
    e.preventDefault();
    newTodo.listId = id;
    // console.log('Create todo in list id ', id, newTodo);
    axios
      .post('/items', newTodo)
      .then((res) => {
        // console.log('resp Add todo ', res.data);
        setAllItems([...allItems, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function createNewList(e) {
    e.preventDefault();
    // console.log(newList);
    if (allLists.length === 5) {
      setInvalidListAmount(true);
      setTimeout(() => {
        setInvalidListAmount(false);
      }, 2500);
    } else if (newList.length > 0) {
      axios
        .post('/lists', { name: newList })
        .then((res) => {
          // console.log(res.data);
          setAllLists([...allLists, res.data]);
          setNewList('');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setInvalidListName(true);
      setTimeout(() => {
        setInvalidListName(false);
      }, 2500);
    }
  }

  function deleteList(e, id) {
    e.preventDefault();
    // console.log(id);
    axios
      .delete(`/lists/${id}`)
      .then((res) => {
        // console.log(res);
        let theNewList = allLists.filter((x) => {
          return x._id !== id;
        });
        setAllLists(theNewList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteItem(e, id) {
    e.preventDefault();
    // console.log(id);
    axios
      .delete(`/items/${id}`)
      .then((res) => {
        // console.log(res);
        let theNewItems = allItems.filter((x) => {
          return x._id !== id;
        });
        setAllItems(theNewItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateItem(e, itemdId, item) {
    e.preventDefault();
    // console.log('Item to Change ', itemdId, item);
    axios
      .patch(`/items/${itemdId}`, item)
      .then((res) => {
        // console.log('Res Item ', res.data);

        setAllItems([
          ...allItems.filter((x, i) => x._id !== itemdId),
          res.data,
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changeListName(e, listId, list) {
    e.preventDefault();
    console.log(listId, list);
    axios
      .patch(`/lists/${listId}`, list)
      .then((res) => {
        console.log('Res List ', res.data);

        setAllLists([
          ...allLists.filter((x, i) => x._id !== listId),
          res.data,
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='board'>
      <Header />
      <main>
        <RenderList
          allLists={allLists}
          deleteList={deleteList}
          allItems={allItems}
          deleteItem={deleteItem}
          addTodo={addTodo}
          updateItem={updateItem}
          changeListName={changeListName}
        />
        <CreateList
          setNewList={setNewList}
          createNewList={createNewList}
          invalidListName={invalidListName}
          newList={newList}
          invalidListAmount={invalidListAmount}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
