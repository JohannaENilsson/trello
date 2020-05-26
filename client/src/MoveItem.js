import React from 'react';

export default function MoveItem({ allLists, handleSelectValue, selectValue }) {

  return (
    <>
      <label htmlFor='move'>
        Move item to other list:
        </label>
        <select
          id='move'
          value={selectValue}
          onChange={(e) => handleSelectValue(e)}
        >
          {allLists.map((list) => {
            return (
              <option key={list._id} value={list._id}>
                {list.name}
              </option>
            );
          })}
        </select>
      
    </>
  );
}
