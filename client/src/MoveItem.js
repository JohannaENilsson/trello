import React, { useState, useEffect } from 'react';

export default function MoveItem({ allLists, listID, item, handleSelectValue, selectValue }) {
//   const [selectValue, setSelectValue] = useState(listID);

//   console.log(selectValue);
//   useEffect(() => {
//     setSelectValue(listID);
//   }, [item]);

// function HandleSelectValue(e){
//     setSelectValue(e.target.value)
// }

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
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            );
          })}
        </select>
      
    </>
  );
}
