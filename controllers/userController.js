const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, '../data/users.json');

const readUsers = () => {
  const data = fs.readFileSync(usersPath, 'utf8');
  return JSON.parse(data);
};

const writeUsers = (data) => {
  fs.writeFileSync(usersPath, JSON.stringify(data, null, 2));
};

exports.createUser = (req, res) => {
  const users = readUsers();
  const newUser = req.body;
  users.push(newUser);
  writeUsers(users);
  res.status(201).send(newUser);
};

exports.getUsers = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const users = readUsers();
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const resultUsers = users.slice(startIndex, endIndex);
  res.json({
    users: resultUsers,
    totalPages: Math.ceil(users.length / limit),
    currentPage: Number(page)
  });
};

exports.searchUsers = (req, res) => {
  const { username, email } = req.query;
  const users = readUsers();
  const filteredUsers = users.filter(user => 
    (username && user.username.toLowerCase().includes(username.toLowerCase())) ||
    (email && user.email.toLowerCase().includes(email.toLowerCase()))
  );
  res.send(filteredUsers);
};

exports.updateUser = (req, res) => {
  const users = readUsers();
  const index = users.findIndex(user => user.user_id === Number(req.params.id));
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    writeUsers(users);
    res.send(users[index]);
  } else {
    res.status(404).send({ error: 'User not found' });
  }
};

exports.deleteUser = (req, res) => {
  const users = readUsers();
  const index = users.findIndex(user => user.user_id === Number(req.params.id));
  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    writeUsers(users);
    res.send(deletedUser);
  } else {
    res.status(404).send({ error: 'User not found' });
  }
};
