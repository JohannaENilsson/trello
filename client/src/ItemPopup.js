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
    name: item.name,
    description: item.description,
    id: item.id,
    listId: item.listId,
  });
  const [selectValue, setSelectValue] = useState(item.listId);

  console.log(selectValue);
  useEffect(() => {
    setSelectValue(item.listId);
  }, [item]);

  if (inputValue.id !== item.id) {
    setInputValue({
      name: item.name,
      description: item.description,
      id: item.id,
      listId: item.listId,
    });
  }

  function handleSelectValue(e) {
    setSelectValue(e.target.value);
    setInputValue({ ...inputValue, listId: parseInt(e.target.value) });
    console.log(inputValue);
  }
  console.log(inputValue);

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
    <div className='popUpBackground' role="dialog">
    <section className='popUpContainer'>
      <button onClick={() => setShowPopup(false)} className='material-icons close'><span>
        cancel</span>
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
        listID={item.listId}
        item={item}
        selectValue={selectValue}
        handleSelectValue={handleSelectValue}
      />
      <div role="group">
      <button
        onClick={(e) => deleteItem(e, item.id)}
        className='material-icons'
      ><span>
        delete</span>
      </button>
      <button onClick={handleUpdate} className='material-icons'><span>
        check_circle</span>
      </button>
      </div>
    </section>
    </div>,

    document.body
  );
}
