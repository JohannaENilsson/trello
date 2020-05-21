import React, { useState, useEffect } from 'react';

export default function MoveItem({ allLists, listID, item }) {
  const [selectValue, setSelectValue] = useState(listID);

  console.log(selectValue);
  useEffect(() => {
    setSelectValue(listID);
  }, [item]);


  return (
    <>
      <label htmlFor='move'>
        Move item to other list:
        <select
          id='move'
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
        >
          {allLists.map((list) => {
            return (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            );
          })}
        </select>
      </label>
    </>
  );
}
