import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import MoveItem from './MoveItem';

export default function ItemPopup({
  item,
  setShowPopup,
  updateItem,
  allLists,
  deleteItem,
}) {
  const [inputValue, setInputValue] = useState({
    id: item._id,
    name: item.name,
    description: item.description,
    listId: item.listId,
    time: item.time,
  });
  const [selectValue, setSelectValue] = useState(item.listId);

  // console.log('Selected listID ', selectValue);
  useEffect(() => {
    setSelectValue(item.listId);
  }, [item]);

  if (inputValue.id !== item._id) {
    setInputValue({
      id: item._id,
      name: item.name,
      description: item.description,
      listId: item.listId,
      time: item.time,
    });
  }

  function handleSelectValue(e) {
    setSelectValue(e.target.value);
    setInputValue({ ...inputValue, listId: e.target.value });
    console.log(inputValue);
  }
  
  function handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setInputValue({ ...inputValue, [name]: value });
  }

  function handleUpdate(e) {
    let data = {
    name: inputValue.name,
    description: inputValue.description,
    listId: inputValue.listId,
    time: inputValue.time,

    }
    e.preventDefault();
    updateItem(e, item._id, data);
    setShowPopup(false);
  }

  function handleDelete(e) {
    deleteItem(e, item._id);
    setShowPopup(false);
  }

  return ReactDOM.createPortal(
    <div className='popUpBackground' role='dialog'>
          <form onSubmit={(e) => handleUpdate(e)} className='popUpContainer'>
          <button
            onClick={() => setShowPopup(false)}
            className='material-icons close'
          >
            <span>cancel</span>
          </button>

          <label htmlFor='name'>Todo:</label>
          <input
            type='text'
            name='name'
            id='name'
            placeholder={item.name}
            value={inputValue.name}
            onChange={handleInputChange}
          />

          <label htmlFor='description'>Description:</label>
          <input
            type='text'
            name='description'
            id='description'
            placeholder={item.description}
            value={inputValue.description}
            onChange={handleInputChange}
          />

          <p>Created: {item.time}</p>
          <MoveItem
            allLists={allLists}
            selectValue={selectValue}
            handleSelectValue={handleSelectValue}
          />
          <div role='group'>
            <button onClick={(e) => handleDelete(e)} className='material-icons'>
              <span>delete</span>
            </button>
            <button type='submit' className='material-icons'>
              <span>check_circle</span>
            </button>
          </div>
        </form>
    </div>,

    document.body
  );
}
