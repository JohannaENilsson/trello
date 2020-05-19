const express = require('express');
const app = express();

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
    id: 001,
    name: 'Cook food',
    description: 'make som delicious vegan food',
    time: 'create time',
    listId: 1,
  },
  {
    id: 002,
    name: 'Watch movie',
    description: 'Se all Anthony Hopkins movies',
    time: 'create time',
    listId: 1,
  },
  {
    id: 003,
    name: 'Pet the cat',
    description: 'Give her some love',
    time: 'create time',
    listId: 1,
  },
  {
    id: 004,
    name: 'Code',
    description: 'Learn how to code',
    time: 'create time',
    listId: 2,
  },
];

let listID = 4;

let itemID = 5;

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
  res.status(200).send(items);
});

function timeStamp(){
  let date = new Date();
  let theDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  console.log('the date IS ', theDate);
  return theDate;
}


itemRouter.post('/', (req, res) => {
  let data = req.body;
    console.log('req is ', req.body);
  let isValid = removeBlankSpace(data);
    console.log(isValid.length);
  if (isValid.length < 1) {
    res.status(406).end();
    return;
  }
  let theDate = timeStamp();
  data.id = `00${itemID}`;
  data.name = isValid;
  data.time = theDate;
  data.listId = data.listId;

  itemID++;
  items.push(data);
  res.status(201).send(data);
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
  res.status(200).send(lists);
});

listRouter.get('/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let list = lists.find(function (list) {
    return list.id === id;
  });
  // Kollar så det finns någon id som matchar
  if (list) {
    res.status(200).send(list);
  } else {
    res.status(404).end();
    return;
  }
});

function removeBlankSpace(data) {
  console.log('I AM ', data);
  let removeWhiteSpace = data.name.trim();
  return removeWhiteSpace;
}

listRouter.post('/', (req, res) => {
  let data = req.body;
  //   console.log('req is ', req.body);
  let isValid = removeBlankSpace(data);
  //   console.log(isValid.length);
  if (isValid.length < 1) {
    res.status(406).end();
    return;
  }
  data.id = listID;
  data.name = isValid;

  listID++;
  lists.push(data);
  res.status(201).send(data);
});

function deleteListAllItems(listId){
  items = items.filter((item) => {
    return item.listId !== listId;
  });
}

// Om en lista raderas måste itemsen som är kopplade till listan raderas *******
listRouter.delete('/:id', (req, res) => {
  let id = parseInt(req.params.id);

  lists = lists.filter(function (list) {
    return list.id !== id;
  });

  let isRemoved = true;
  lists.filter(function (list) {
    if (list.id !== id) {
      return (isRemoved = true);
    } else {
      return (isRemoved = false);
    }
  });

  if (isRemoved) {
    deleteListAllItems(id);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});
// listRouter.patch('/board/:id', (req, res) => {}); // ********* EXTRA UPPDATERA NAMNET

app.use('/lists', listRouter);

const PORT = 8090;
app.listen(PORT, () => {
  console.log(`Connected to server at ${PORT}`);
});
