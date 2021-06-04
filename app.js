const { response } = require('express');
const express = require('express');

const app = express();
app.use(express.json());

const contacts = ['claudio', 'gorete', 'kaike', 'kevin'];

/*
app.use((request, response, next) => {
  console.log('Access Middleware');
  next();
});
*/

function validContact(request, response, next) {
  if(!request.body.name){
    return response.status(400).json({ error: "already send is name!"});
  }
  return next();
}

function validName(request, response, next) {
  const { name } = request.body;

  const getContactName = name => name;
  const nameAlreadyExists = contacts.filter(getContactName);

  if(nameAlreadyExists.includes(name)){
    return response.status(400).json({error: "Name not already exists!"});
  }
  return next();
}

function validId(request, response, next) {
  const { id } = request.params;

  if(!contacts[id]){
    return response.status(400).json({ error: "ID not already exists!"})
  }
  return next();
}

app.get('/contacts', (request, response) => {
  return response.json(contacts);
});

app.get('/contacts/:id', validId, (request, response) => {
  const { id } = request.params;

  return response.json({
    name: contacts[id],
  });
});

app.post('/contacts', validName, (request, response) => {
  const { name } = request.body;

  contacts.push(name);

  return response.status(201).json(contacts);
});

app.put('/contacts/:id', validContact, validId, (request, response) => {
  const { id } = request.params;
  const { name } = request.body;

  contacts[id] = name;

  return response.status(201).json({
    name: contacts[id],
  })
});

app.delete('/contacts/:id', validId, (request, response) => {
  const { id } = request.params;

  contacts.splice(id, 1);

  return response.json({
    name: contacts[id],
  });
});

app.listen(3000, () => {
  console.log(`Server run port 3000!`);
});