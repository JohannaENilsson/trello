const express = require('express');
const app = express();

const { getClient, getDB, createObjectId } = require('./db');

// Board -> collection -> board
// list -> obj {name: listName, items: [{title: str, description: str, created: date}]}
// item -> obj {title: str, description: str, created: date, listId:}

// middleware to parse data

let lists = [
  {
    id: 1,
    name: 'Todo',
  },
  {
    id: 2,
    name: 'Inprogress',
  },
];

let items = [
  {
    id: 100,
    name: 'Cook food',
    description: 'make som delicious vegan food',
    time: 'create time',
    listId: 1,
  },
  {
    id: 200,
    name: 'Watch movie',
    description: 'Se all Anthony Hopkins movies',
    time: 'create time',
    listId: 1,
  },
  {
    id: 300,
    name: 'Pet the cat',
    description: 'Give her some love',
    time: 'create time',
    listId: 1,
  },
  {
    id: 400,
    name: 'Code',
    description: 'Learn how to code',
    time: 'create time',
    listId: 2,
  },
];

let listID = 4;

let itemID = 500;

// {listId: String, itemId :string}
let relationListItem = [];

// {boardID: string, listID: string} ???
// Kan hämta ut dem som är kopplade till boarden och därefter itemsen som är kopplade till resp lista
let board = [];

app.use(express.json());

app.use((req, res, next) => {
  let start = new Date();
  res.once('finish', () => {
    console.log(req.method, req.path, res.statusCode, new Date() - start, 'ms');
  });
  next();
});

app.use((req, res, next) => {
  let data = req.body;
  if (!data) {
    res.status(400).end();
    return;
  }
  next();
});

// ITEM ********************************************************************** */
let itemRouter = express.Router();
itemRouter.get('/', (req, res) => {
  const db = getDB();
  db.collection('items')
    .find({})
    .toArray()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });

});

function timeStamp() {
  let date = new Date();
  let theDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  return theDate;
}

itemRouter.patch('/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let data = req.body;
  console.log('req data is ', data);
  console.log('req ID is ', id);

  let itemIndex = items.findIndex(function (item) {
    console.log('item ID is ',item.id, 'And PARAM ID IS', id);
    return item.id === id; 
  });
  console.log('The item is here? ', itemIndex);

  if (itemIndex === -1) {
    res.status(400).end();
    return;
  }

  items[itemIndex] = {
    ...items[itemIndex],
    ...data,
  };

  console.log(items[itemIndex]);
  console.log(items);
  res.status(200).send(items[itemIndex]);
});

itemRouter.post('/', (req, res) => {
  let data = req.body;
  const db = getDB();
  
  let isValid = removeBlankSpace(data);

  if (isValid.length < 1) {
    res.status(400).end();
    return;
  }
  let theDate = timeStamp();
  data.name = isValid;
  data.time = theDate;
  data.listId = data.listId;

  db.collection('items')
    .insertOne(data)
    .then((result) => {
      data._id = result.insertedId;
      console.log('from THEN ITEMS ', data);
      res.status(201).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

itemRouter.delete('/:id', (req, res) => {
  let id = parseInt(req.params.id);

  items = items.filter(function (item) {
    return item.id !== id;
  });

  let isRemoved = true;
  items.filter(function (item) {
    if (item.id !== id) {
      return (isRemoved = true);
    } else {
      return (isRemoved = false);
    }
  });

  if (isRemoved) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

app.use('/items', itemRouter);

// LIST ********************************************************************** */
let listRouter = express.Router();
listRouter.get('/', (req, res) => {
  const db = getDB();
  db.collection('lists')
    .find({})
    .toArray()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});


// TA BORT?***********
// listRouter.get('/:id', (req, res) => {
//   let id = parseInt(req.params.id);
//   let list = lists.find(function (list) {
//     return list.id === id;
//   });
//   // Kollar så det finns någon id som matchar
//   if (list) {
//     res.status(200).send(list);
//   } else {
//     res.status(404).end();
//     return;
//   }
// });

function removeBlankSpace(data) {
  console.log('I AM ', data);
  let removeWhiteSpace = data.name.trim();
  return removeWhiteSpace;
}

listRouter.post('/', (req, res) => {
  let data = req.body;
  const db = getDB();

  let isValid = removeBlankSpace(data);
  data.name = isValid;
  //   console.log(isValid.length);
  if (isValid.length < 1) {
    res.status(400).end();
    return;
  }
  
  db.collection('lists')
    .insertOne(data)
    .then((result) => {
      data._id = result.insertedId;
      
      console.log('from THEN LISTS ', data);
      res.status(201).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

function deleteListAllItems(listId) {
  items = items.filter((item) => {
    return item.listId !== listId;
  });
}

listRouter.delete('/:id', (req, res) => {
  let id = req.params.id;
  const db = getDB();

  db.collection('lists')
    .deleteOne({ _id: createObjectId(id) })
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });

    // TÖM ITEMS FRÅN LISTA!!!!
  // lists = lists.filter(function (list) {
  //   return list.id !== id;
  // });

  // let isRemoved = true;
  // lists.filter(function (list) {
  //   if (list.id !== id) {
  //     return (isRemoved = true);
  //   } else {
  //     return (isRemoved = false);
  //   }
  // });

  // if (isRemoved) {
  //   deleteListAllItems(id);
  //   res.status(204).end();
  // } else {
  //   res.status(404).end();
  // }
});
// listRouter.patch('/board/:id', (req, res) => {}); // ********* EXTRA UPPDATERA NAMNET

app.use('/lists', listRouter);

const PORT = 8090;
app.listen(PORT, () => {
  console.log(`Connected to server at ${PORT}`);
});
