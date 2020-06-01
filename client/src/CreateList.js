import React from 'react';

export default function CreateList({setNewList, createNewList, invalidListName, newList, invalidListAmount}){

    return(

        <section className='listContainer'>
          <h2>New list</h2>
          <form onSubmit={(e) => createNewList(e)}>
          <label htmlFor='list' className='hideLabel'>
            Name on new list:
            </label>
            <input
              minLength='1'
              type='text'
              id='list'
              placeholder='Name the list'
              value={newList}
              onChange={(e) => setNewList(e.target.value)}
            />
          
          <button type='submit' className="material-icons"><span>add_circle</span></button>
          {invalidListName && <p>List must have a name</p>}
          {invalidListAmount && <p>too many list! create a new board</p>}
          </form>
        </section>

    );
}