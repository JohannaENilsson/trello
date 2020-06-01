import React, { useState} from 'react';
import AriaModal from 'react-aria-modal';

export default function ListPopup({
  list,
  deactivateModal,
  changeListName,
  deleteList,
}) {
  
  const [newListName, setNewListName] = useState(list.name);

  function handleUpdate(e) {
    let data = {
      name: newListName,
    };
    e.preventDefault();
    changeListName(e, list._id, data);
    deactivateModal();
  }

  function handleDelete(e) {
    deleteList(e, list._id);
    deactivateModal();
  }

  return (
    <AriaModal
      titleText='Change ListName'
      onExit={deactivateModal}
      initialFocus='#demo-one-deactivate'
      underlayStyle={{ paddingTop: '7em' }}
    >
      <div id='demo-one-modal' className='modal'>
        <p>list</p>
        <form onSubmit={(e) => handleUpdate(e)} className='popUpContainer'>
          <button
            onClick={() => deactivateModal()}
            className='material-icons close'
          >
            <span>cancel</span>
          </button>
          <label htmlFor='name' >
            Change list name:
          </label>

          <input
            type='text'
            name='name'
            id='name'
            id='demo-one-deactivate'
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          

          <div role='group'>
            <button onClick={(e) => handleDelete(e)} className='material-icons'>
              <span>delete</span>
            </button>
            <button
              type='submit'
              className='material-icons'
              
            >
              <span>check_circle</span>
            </button>
          </div>
        </form>
      </div>
    </AriaModal>
  );
}
