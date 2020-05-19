import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './style/style.scss';

import RenderList from './RenderList';

function App() {
  // const [newTodo, setNewTodo] = useState('Add todo');
  const [newList, setNewList] = useState('');
  const [allLists, setAllLists] = useState(null);
  const [allItems, setAllItems] = useState(null);
  const [invalidListName, setInvalidListName] = useState(false);

  useEffect(() => {
    axios
      .get('/lists')
      .then((res) => {
        console.log(res.data);
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
        console.log('items ', res.data);
        setAllItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function addTodo(e, id, newTodo) {
    e.preventDefault();
    newTodo.listId = id;
    console.log('Create todo in list id ', id, newTodo);
    axios
      .post('/items', newTodo)
      .then((res) => {
        console.log(res.data);
        setAllItems([...allItems, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function createNewList(e) {
    e.preventDefault();
    console.log(newList);
    if(newList.length > 0){
      axios
          .post('/lists', { name: newList })
          .then((res) => {
            console.log(res.data);
            setAllLists([...allLists, res.data]);
            setNewList('');
          })
          .catch((err) => {
            console.log(err);
          });
    } else{
      setInvalidListName(true);
      setTimeout(() => {
        setInvalidListName(false);
      }, 2500);
    }
  
  }

  function deleteList(e, id) {
    e.preventDefault();
    console.log(id);
    axios
      .delete(`/lists/${id}`)
      .then((res) => {
        console.log(res);
        let theNewList = allLists.filter((x) => {
          return x.id !== id;
        });
        setAllLists(theNewList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteItem(e, id) {
    e.preventDefault();
    console.log(id);
    axios
      .delete(`/items/${id}`)
      .then((res) => {
        console.log(res);
        let theNewItems = allItems.filter((x) => {
          return x.id !== id;
        });
        setAllItems(theNewItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // function changeListName(e) {
  //   e.preventDefault();
  //   console.log(newList);
  // }

  return (
    <div className='App'>
      <header><h1>Organize</h1></header>
      <main className='board'>
        <RenderList
          allLists={allLists}
          deleteList={deleteList}
          allItems={allItems}
          deleteItem={deleteItem}
          addTodo={addTodo}
        />

        <section className='listContainer'>
          <h2>Create a new list</h2>
          <label>
            Name on new list:
            <input
              minLength='1'
              type='text'
              placeholder='Name the list'
              value={newList}
              onChange={(e) => setNewList(e.target.value)}
            />
          </label>
          <button onClick={(e) => createNewList(e)}>Add new list</button>
          {invalidListName && <p>List must have a name</p>}
        </section>
      </main>
    </div>
  );
}

export default App;
