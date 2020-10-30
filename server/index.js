require('dotenv').config();

const massive = require('massive'),
  session = require('express-session'),
  axios = require('axios'),
  controller = require('./controller'),
  express = require('express'),
  {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
  port = SERVER_PORT,
  app = express(); 

  app.use(express.json());

  app.use(session({
      resave: false,
      saveUninitialized: true,        //Personal note DL
      secret: SESSION_SECRET,
      cookie: {maxAge: 1000 * 60 * 60 * 24 *365}
  }));

  massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
  }).then(db => {
    app.set('db', db);
    console.log('db connected securely')
  });

//Auth
  app.post('/auth/register', controller.register);
  app.post('/auth/login', controller.login);
  app.get('/auth/logout', controller.logout);

  //Post
  app.get('/api/posts', controller.getUserPost);
  app.post('/api/posts', controller.createPost);
  app.put('/api/post/:id', controller.updatePost);
  app.delete('/api/posts/:id', controller.deletePost);

  app.listen(port, () => console.log(`This bad boy is listening on ${port}`));