import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import MoveItem from './MoveItem';

export default function ItemPopup({ item, setShowPopup, updateItem, allLists }) {
  const [inputValue, setInputValue] = useState({
    name: item.name,
    description: item.description,
    id: item.id,
  });
  console.log('Item that was clicked on ', item);

  if (inputValue.id !== item.id) {
    setInputValue({
      name: item.name,
      description: item.description,
      id: item.id,
    });
  }

  function handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setInputValue({ ...inputValue, [name]: value });
  }

  function handleUpdate() {
    updateItem(item.id, inputValue);
  }

  return ReactDOM.createPortal(
    <section>
      <button onClick={() => setShowPopup(false)}>Close</button>
      {/* <h1>{item.name}</h1> */}
      <label>
        Name:
        <input
          type='text'
          name='name'
          placeholder={item.name}
          value={inputValue.name}
          onChange={handleInputChange}
        />
      </label>
      {/* <p>{item.description}</p> */}
      <label>
        Description:
        <input
          type='text'
          name='description'
          placeholder={item.description}
          value={inputValue.description}
          onChange={handleInputChange}
        />
      </label>
      <p>Created: {item.time}</p>
      <MoveItem allLists={allLists} listID={item.listId} item={item}/>
      <button onClick={handleUpdate}>Update</button>
    </section>,

    document.body
  );
}
