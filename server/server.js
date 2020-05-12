const express = require('express');
const app = express();

// Board -> collection -> board
// list -> obj {name: listName, items: [{title: str, description: str, created: date}]}
// item -> obj {title: str, description: str, created: date}

const {getClient, getDB, createObjectId} = require('./db');




// middleware to parse data
// middleware log -> req, res, method, answer time


// app.get('/board', (req, res) => {
//   const db = getDB();
//   db.collection('board')
//     .find({})
//     .toArray()
//     .then((data) => {
//       console.log('Data from server ', data);
//       res.status(200).send(data);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).end();
//     });
// });
// app.use(express.json());


app.get('/board', (req, res) => {
    // res.send('some other tetxs')
    res.send({test: 'another test'})
  });

app.get('/board/:id', (req, res) => {
    
})

app.post('/board', (req, res) => {
    
})

app.delete('/board/:id', (req, res) => {
    
})

app.get('/board', (req, res) => {
    
})

app.patch('/board/:id', (req, res) => {
    
})


const PORT = 8090;
app.listen(PORT, () => {
    console.log(`Connected to server at ${PORT}`);
})