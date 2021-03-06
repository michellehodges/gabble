//Dependencies
const express = require('express');
const mustache = require('mustache-express');
const bodyparser = require('body-parser');
const session = require('express-session');
const UUIDV4 = require('uuid/v4')
const Sequelize = require('sequelize');
const server = express();

//Server configure
server.engine('mustache', mustache());
server.set('views', './views');
server.set('view engine', 'mustache');
server.use(express.static('public'));
server.use(bodyparser.urlencoded( { extended: false }));
server.use(session({
    secret: '98rncailevn-_DT83FZ@',
    resave: false,
    saveUninitialized: true
}));

/*********************GABBLE SCHEMAS*********************/
'use strict'

const db = new Sequelize('gabble_development', 'mischy', '', {
  dialect: 'postgres',
})

const User = db.define('user', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING(20),
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(20),
    allowNull: false
  }
})

const Message = db.define('message', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  user_id: {
    type: Sequelize.UUID,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING(140),
    allowNull: false
  }
})

const Like = db.define('like', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  user_id: {
    type: Sequelize.UUID,
    allowNull: false
  },
  message_id: {
    type: Sequelize.UUID,
    allowNull: false
  }
})

Message.belongsTo(User, { foreignKey: 'user_id' });
Message.hasMany(Like, { foreignKey: 'message_id', as: 'likes' });
Like.belongsTo(User, { foreignKey: 'user_id' })
Like.belongsTo(Message, { foreignKey: 'message_id' });

User.sync()
  .then(function() {
    // return
    // console.log('User models synced')
    let users = [User.create({
      id: '0e3374d2-4b90-4123-bbdc-41245c800215',
      username: 'mindykaling',
      password: 'donuts',
    }),
    User.create({
      id: '042f9350-8e32-4cad-85ad-a87238f32007',
      username: 'harrystyles',
      password: 'taytay',
    }),
    User.create({
      id: 'c9ef1aff-cc7e-4f71-8380-e33ff19c13da',
      username: 'taylorswift',
      password: 'calvin',
    }),
    User.create({
      id: 'a36e0e1d-8e74-47cd-977a-deb915e53887',
      username: 'mikehodges',
      password: 'michelle',
    }),
    User.create({
      id: '4be57d1e-a310-4bd7-9c85-535531457797',
      username: 'abc',
      password: '123',
    })];

    return Promise.all(users);
  })
  .then(function(){
    return Message.sync().then(function() {
      console.log('Message models synced');
      let messages = [Message.create({
        id: '4548d4c6-a337-46c2-9f23-459df8e3679b',
        user_id: '4be57d1e-a310-4bd7-9c85-535531457797',
        content: 'It is one of those days where all I want is a donut topped with sprinkles.',
      }),
      Message.create({
        id: 'd8a7daf7-ed18-4cd8-82fe-b378059b05c9',
        user_id: 'a36e0e1d-8e74-47cd-977a-deb915e53887',
        content: 'Gabble is such an awesome app!',
      }),
      Message.create({
        id: '5f0c7f0b-2336-4f47-baa9-24d5ad1fdc21',
        user_id: 'c9ef1aff-cc7e-4f71-8380-e33ff19c13da',
        content: 'I got my exam back the other day. It was a B. My mom will be angry.',
      }),
      Message.create({
        id: '3ac71891-deec-4870-b45d-d1422a479ae5',
        user_id: 'c9ef1aff-cc7e-4f71-8380-e33ff19c13da',
        content: 'The government... Sucks.',
      }),
      Message.create({
        id: '8eb2e1b7-f81e-4f0d-aba4-ae4aa2121c1c',
        user_id: '0e3374d2-4b90-4123-bbdc-41245c800215',
        content: 'Political comment here! Political commment there! Ridiculous!',
      })];

      return Promise.all(messages);
    })
  })
    .then(function(){
      Like.sync().then(function(){
        console.log('Like models synced')
        Like.create({
          id: '37519323-dcf9-41f5-9ed4-adc14f12bd62',
          user_id: 'a36e0e1d-8e74-47cd-977a-deb915e53887',
          message_id: '8eb2e1b7-f81e-4f0d-aba4-ae4aa2121c1c',
        });
        Like.create({
          id: '36181b04-07fa-48d7-94fe-3ad7eff5833e',
          user_id: '042f9350-8e32-4cad-85ad-a87238f32007',
          message_id: '8eb2e1b7-f81e-4f0d-aba4-ae4aa2121c1c',
        });
        Like.create({
          id: 'b85f54dd-422e-43eb-bc11-a09bff714e52',
          user_id: '0e3374d2-4b90-4123-bbdc-41245c800215',
          message_id: '3ac71891-deec-4870-b45d-d1422a479ae5',
        });
        Like.create({
          id: 'db08ce7a-69af-42f6-82c4-9257f760a922',
          user_id: '4be57d1e-a310-4bd7-9c85-535531457797',
          message_id: '4548d4c6-a337-46c2-9f23-459df8e3679b',
        });
        Like.create({
          id: '625b4b29-b5f5-4d2c-a3eb-eb3df12e2a15',
          user_id: 'c9ef1aff-cc7e-4f71-8380-e33ff19c13da',
          message_id: '5f0c7f0b-2336-4f47-baa9-24d5ad1fdc21',
        });
      })
    })


/************************ END OF SCHEMA ****************************/

// //GET REQUESTS
server.get('/', function(request, response) {
  response.render('welcome')
})

server.get('/main', function(request, response) {
  if (request.session.who !== undefined) {
    Message.findAll({ include: [User, { model: Like, as: 'likes' }] })
      .then(function(results){
        // for every result in results..set a new "currentAuthor" field, which contains a boolean, which is true when the author of the result is the same as the username in session.
        for (let i = 0; i < results.length; i++) {
          results[i].currentAuthor = results[i].user_id === request.session.who.id;
          results[i].liked = results[i].likes.length > 0;
        }

        response.render('main', {
          gabbles: results,
          currentUser: request.session.who.username
        });
      });
  } else {
    response.redirect('/');
  }
});

server.get('/register', function(request, response) {
  response.render('register')
})

server.get('/logout', function(request, response) {
  response.render('logout')
})


server.get('/likes/:message_id', function(request, response) {
  Like.findAll({ where: {message_id: request.params.message_id} , include: [User] })
    .then(function(likes) {
      response.render('likes', {
        likers: likes
      })
  })
})


//POST REQUESTS
server.post('/main', function(request, response) {
  let username = request.body.username;
  let password = request.body.password;

  if (username === '' || password === '') {
    console.log("Empty User/Pass");
    response.redirect('/')
  } else {
  User.findOne({ where: { 'username': username, 'password': password }})
    .then(function (user) {
      if (user === null) {
        console.log('User not found!');
        response.render('welcome', { failed: "Username or password not found. Please try again."});
      } else {
        request.session.who = user;
        response.redirect('/main')
      }
    })
  }
})

server.post('/register', function(request, response) {
  let newUsername = request.body.newUsername;
  let newPassword = request.body.newPassword;

  if (newUsername !== null && newPassword !== null && newUsername > 0 && newUsername < 20 && newPassword > 0 && newPassword < 20) {
    User.create({
      username: newUsername,
      password: newPassword
    })
      .then(function(newUser){
        console.log(newUser)
      })
      .catch(function(err){
        console.log(err)
      })
    }
  response.render('success')
})

server.post('/create', function (request, response) {
  console.log(request.body);
  if ((request.body.body.length > 0) && (request.body.body.length < 140))  {
    Message.create({
      user_id: request.session.who.id,
      content: request.body.body,
    })
      .then(function(newGabble){
        response.redirect('/main');
      }).catch(function(err){
        console.log(err)
      })

  } else if ((request.body.body.length === 0) || (request.body.body.length > 140)) {
      Message.findAll({ include: [User] })
        .then(function(results){
          response.render('main', {
            gabbles: results,
            currentUser: request.session.who.username,
            needBody: "A gabble of 140 characters max is required to post."
            })
        })
    }
});

server.post('/sort', function(request, response) {
  if (request.body.sorttype === 'dateascending') {
  Message.findAll({ include: [User, { model: Like, as: 'likes' }], order: [[ 'createdAt', 'ASC' ]] }).then(function(results) {
    for (let i = 0; i < results.length; i++) {
      results[i].currentAuthor = results[i].user_id === request.session.who.id;
      results[i].liked = results[i].likes.length > 0;
    }
    response.render('main', {
      gabbles: results,
      currentUser: request.session.who.username,
      })
    })
  } else if (request.body.sorttype === 'datedescending') {
  Message.findAll({ include: [User, { model: Like, as: 'likes' }], order: [[ 'createdAt', 'DESC' ]] }).then(function(results) {
    for (let i = 0; i < results.length; i++) {
      results[i].currentAuthor = results[i].user_id === request.session.who.id;
      results[i].liked = results[i].likes.length > 0;
    }
    response.render('main', {
      gabbles: results,
      currentUser: request.session.who.username,
      })
    })
  }
})

server.post('/like/:message_id', function(request, response) {
  Like.create({
    include: [User, Message],
    user_id: request.session.who.id,
    message_id: request.params.message_id
  })
    .then(function(results) {
        response.redirect('/main')
    });
})

server.post('/delete/:message_id', function(request, response) {
  Message.findOne({where : { id: request.params.message_id } })
    .then(function(message) {
      //if the session owner id is equals to the message's user_id, then do this function
      if (request.session.who.id === message.user_id) {
        Message.destroy({ where: { id: request.params.message_id }})
          .then(function(results) {
            response.redirect('/main')
          });
      } else {
        throw 'error';
      }
  })
});


server.post('/logout', function(request, response) {
  request.session.destroy(function() {
    response.redirect('/logout')
  });
})

// //LISTEN TO PORT
server.listen(3000, function() {
  console.log("Gabble gabble!");
})
