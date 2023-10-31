const express = require('express')
const app = express()
const cors = require('cors')
const { v4: uuidv4, v4 } = require('uuid');
require('dotenv').config()

app.use(cors())
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const users = [];

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  console.log(req.body)
  const { username } = await req.body;

  users.push({ username, _id: v4() });
  res.json({ username, _id: v4() });
})

app.post('/api/users/:_id/exercises', (req, res) => {
  const { _id } = req.params;

  const user = users.find(user => user._id === _id);

  if (!user) {
    return res.json({ error: 'User not found' });
  }

  const { description, duration, date } = req.body;

  Number(duration);

  const exercise = {
    description,
    duration,
    date: date ? new Date(date).toDateString() : new Date().toDateString()
  }

  user.log = user.log ? [...user.log, exercise] : [exercise];

  res.json({
    username: user.username,
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.date,
    _id: user._id,
  });
})

app.get('/api/users/:_id/logs', (req, res) => {
  const { _id } = req.params;
  console.log(users, _id)

  const user = users.find(user => user._id === _id);

  if (!user) {
    return res.json({ error: 'User not found' });
  }

  // const { from, to, limit } = req.query;
  // study this part and write it yourself

  res.json({
    _id: user._id,
    username: user.username,
    count: log.length,
    log,
  });
});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
