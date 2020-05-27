const express = require('express');
const app = express();

const { getClient, getDB, createObjectId } = require('./db');

// Board -> collection -> board
// list -> obj {name: listName, items: [{title: str, description: str, created: date}]}
// item -> obj {title: str, description: str, created: date, listId:}

// app.use(express.json());

app.use((req, res, next) => {
  console.log('Is req.body ', req.is('json'));
  if (req.is('json')) {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk.toString();
    });

    req.on('end', () => {
      try {
        data = JSON.parse(data);
        req.body = data;
        console.log('setting body:', req.body);
        next();
      } catch (e) {
        res.status(400).end();
      }
    });
  } else {
    next();
  }
});

// app.use((req, res, next) => {
//   let data = req.body;
//   if (!data) {
//     res.status(400).end();
//     return;
//   }
//   next();
// });

app.use((req, res, next) => {
  let start = new Date();
  res.once('finish', () => {
    console.log(req.method, req.path, res.statusCode, new Date() - start, 'ms');
  });
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
  let id = req.params.id;
  let data = req.body;
  const db = getDB();
  console.log(id);

  // let isValid = removeBlankSpace(data);

  // if (isValid.length < 1) {
  //   res.status(400).end();
  //   return;
  // }

  db.collection('items')
    .updateOne(
      { _id: createObjectId(req.params.id) },
      {
        $set: {
          name: data.name,
          description: data.description,
          listId: data.listId,
          time: data.time,
        },
      }
    )
    .then((result) => {
      data._id = req.params.id;

      console.log('from THEN ITEMS ', data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
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
  let id = req.params.id;
  const db = getDB();

  db.collection('items')
    .deleteOne({ _id: createObjectId(id) })
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
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
