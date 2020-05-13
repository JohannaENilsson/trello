const express = require('express');
const app = express();

// Board -> collection -> board
// list -> obj {name: listName, items: [{title: str, description: str, created: date}]}
// item -> obj {title: str, description: str, created: date}

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
    data: 'create time',
  },
  {
    id: 002,
    name: 'Watch movie',
    description: 'Se all Anthony Hopkins movies',
    data: 'create time',
  },
  {
    id: 003,
    name: 'Pet the cat',
    description: 'Give her some love',
    data: 'create time',
  },
  {
    id: 004,
    name: 'Code',
    description: 'Learn how to code',
    data: 'create time',
  },
];

let listID = 4;

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
  let removeWhiteSpace = data.name.trim();

  return removeWhiteSpace;
}

listRouter.post('/', (req, res) => {
  let data = req.body;
//   console.log('req is ', req.body);
  let isValid = removeBlankSpace(data);
//   console.log(isValid.length);
  if (isValid.length < 2) {
    res.status(406).end();
    return;
  }
  data.id = listID;
  data.name = isValid;

  listID++;
  lists.push(data);
  res.status(201).send(data);
});

// listRouter.delete('/board/:id', (req, res) => {});

// listRouter.get('/board', (req, res) => {});

// listRouter.patch('/board/:id', (req, res) => {});

app.use('/lists', listRouter);

const PORT = 8090;
app.listen(PORT, () => {
  console.log(`Connected to server at ${PORT}`);
});
