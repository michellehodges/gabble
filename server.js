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
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false
  },
  updated_at: {
    type: Sequelize.DATE,
  },
  underscored: true,
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
    type: Sequelize.STRING,
    allowNull: false
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false
  },
  underscored: true,
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
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false
  },
  underscored: true,
})

//TODO: Is this correct on how to relate?
Message.belongsTo(User, { as: 'username', foreignKey: 'user_id' });
Like.associate = function(models) {
  Like.belongsTo(User, { as: 'username', foreignKey: 'user_id' })
  Like.belongsTo(Message, { as: 'message', foreignKey: 'message_id' });
}

//TODO: How to classify the UUID in this case?
User.sync().then(function(){
  console.log('User models synced')
  User.create({
    id: 0e3374d2-4b90-4123-bbdc-41245c800215,
    username: 'mindykaling',
    password: 'donuts',
  });
  User.create({
    id: 042f9350-8e32-4cad-85ad-a87238f32007,
    username: 'harrystyles',
    password: 'taytay',
  });
  User.create({
    id: c9ef1aff-cc7e-4f71-8380-e33ff19c13da,
    username: 'taylorswift',
    password: 'calvin',
  });
  User.create({
    id: a36e0e1d-8e74-47cd-977a-deb915e53887,
    username: 'mikehodges',
    password: 'michelle',
  });
  User.create({
    id: 4be57d1e-a310-4bd7-9c85-535531457797,
    username: 'abc',
    password: '123',
  });
})


//TODO: Adding data to the SQL database
Message.sync().then(function(){
  console.log('Message models synced')
  Message.create({
    id: 4548d4c6-a337-46c2-9f23-459df8e3679b,
    user_id: 4be57d1e-a310-4bd7-9c85-535531457797,
    content: 'It is one of those days where all I want is a donut topped with sprinkles.',
  });
  Message.create({
    id: d8a7daf7-ed18-4cd8-82fe-b378059b05c9,
    user_id: a36e0e1d-8e74-47cd-977a-deb915e53887,
    content: 'Gabble is such an awesome app!',
  });
  Message.create({
    id: 5f0c7f0b-2336-4f47-baa9-24d5ad1fdc21,
    user_id: c9ef1aff-cc7e-4f71-8380-e33ff19c13da,
    content: 'I got my exam back the other day. It was a B. My mom will be angry.',
  });
  Message.create({
    id: 3ac71891-deec-4870-b45d-d1422a479ae5,
    user_id: c9ef1aff-cc7e-4f71-8380-e33ff19c13da,
    content: 'The government... Sucks.',
  });
  Message.create({
    id: 8eb2e1b7-f81e-4f0d-aba4-ae4aa2121c1c,
    user_id: 0e3374d2-4b90-4123-bbdc-41245c800215,
    content: 'Political comment here! Political commment there! Ridiculous!',
  });
})

//TODO: Adding data to the SQL database
Like.sync().then(function(){
  console.log('User models synced')
  Like.create({
    id: 37519323-dcf9-41f5-9ed4-adc14f12bd62,
    user_id: a36e0e1d-8e74-47cd-977a-deb915e53887,
    message_id: 8eb2e1b7-f81e-4f0d-aba4-ae4aa2121c1c,
  });
  Like.create({
    id: 36181b04-07fa-48d7-94fe-3ad7eff5833e,
    user_id: 042f9350-8e32-4cad-85ad-a87238f32007,
    message_id: 8eb2e1b7-f81e-4f0d-aba4-ae4aa2121c1c,
  });
  Like.create({
    id: b85f54dd-422e-43eb-bc11-a09bff714e52,
    user_id:0e3374d2-4b90-4123-bbdc-41245c800215,
    message_id: 3ac71891-deec-4870-b45d-d1422a479ae5,
  });
  Like.create({
    id: db08ce7a-69af-42f6-82c4-9257f760a922,
    user_id:4be57d1e-a310-4bd7-9c85-535531457797,
    message_id: 4548d4c6-a337-46c2-9f23-459df8e3679b,
  });
  Like.create({
    id: 625b4b29-b5f5-4d2c-a3eb-eb3df12e2a15,
    user_id: c9ef1aff-cc7e-4f71-8380-e33ff19c13da,
    message_id: 5f0c7f0b-2336-4f47-baa9-24d5ad1fdc21,
  });
})

/************************ END OF SCHEMA ****************************/

//GET REQUESTS
server.get('/', function(request, response) {
  response.render('welcome')
})

server.get('/main', function(request, response) {
  if (request.session.who !== undefined) {
    Message.findAll()
      .then(function(err, results){
        response.render('main', {
          gabbles: results,
          username: request.session.who[0].username,
          })
      })
    )
  } else {
    response.redirect('/');
  }
})
//
// server.get('/register', function(request, response) {
//   response.render('register')
// })
//
// server.get('/logout', function(request, response) {
//   response.render('logout')
// })
//
// server.get('/api', function(request, response) {
//   Snippet.find({}, function(err, results){ response.json(results) })
// })
//
// server.get('/snippets/:snippet_id', function(request, response) {
//   Snippet.find({ _id: request.params.snippet_id }, function(err, results){
//     response.render('individuals', { snippet: results })
//   })
// })
//
// //POST REQUESTS
server.post('/main', function(request, response) {
  let username = request.body.username;
  let password = request.body.password;

  if (username === '' || password === '') {
    console.log("Empty User/Pass");
    response.redirect('/')
  } else {
  User.findOne({ where: { 'username': username, 'password': password }})
    .then(function(err, user) {
      if (err) { response.redirect('/') }
      if (user.length === 0) {
        console.log('User not found!');
        response.render('welcome', { failed: "Username or password not found. Please try again."});
      } else {
        request.session.who = user;
        response.redirect('/main')
      }
    })
  }
})
//
// server.post('/register', function(request, response) {
//   if (request.body.newUsername !== null && request.body.newPassword !== null) {
//     User.create({
//       username: request.body.newUsername,
//       password: request.body.newPassword
//     })
//       .then(function(newUser){
//         console.log(newUser)
//       })
//       .catch(function(err){
//         console.log(err)
//       })
//     }
//   response.render('success')
// })
//
// server.post('/create', function (request, response) {
//   console.log(request.body);
//   if ((request.body.title.length != 0) && (request.body.body.length != 0) && (request.body.language.length != 0) && (request.body.tags.length != 0)) {
//     Snippet.create({
//       owner: request.session.who[0].username,
//       title: request.body.title,
//       body: request.body.body,
//       notes: request.body.notes,
//       language: request.body.language,
//       tags: request.body.tags.split(',')
//     })
//       .then(function(newSnippet){
//         console.log(newSnippet)
//       })
//       .catch(function(err){
//         console.log(err)
//       })
//       response.redirect('/main');
//   } else if (request.body.title.length === 0) {
//     response.render('main', { needTitle: "A title is required." });
//   } else if (request.body.body.length === 0) {
//     response.render('main', { needBody: "Body to snippet is required." });
//   } else if (request.body.language.length === 0) {
//   response.render('main', { needLanguage: "Language is required." });
//   } else if (request.body.tags.length === 0) {
//   response.render('main', { needTags: "At least one tag is required." });
//   }
// });
//
// server.post('/search', function(request, response) {
//   if (request.body.search === '') {
//     response.redirect('/main');
//   } else if (request.body.searchtype === 'username'){
//     Snippet.find({owner: request.body.search}, function(err, searchResults) {
//       if (searchResults.length === 0) {
//         response.render('main', {
//           noResults: "Sorry, we can't find any snippets that matches your search.",
//           username: request.session.who[0].username
//         })
//       } else {
//         response.render('main', {
//           snippets: searchResults,
//           username: request.session.who[0].username
//         })
//       }
//     })
//   } else if (request.body.searchtype === 'language'){
//     Snippet.find({language: request.body.search}, function(err, searchResults) {
//       if (searchResults.length === 0) {
//         response.render('main', {
//           noResults: "Sorry, we can't find any snippets that matches your search.",
//           username: request.session.who[0].username
//         })
//       } else {
//         response.render('main', {
//           snippets: searchResults,
//           username: request.session.who[0].username
//         })
//       }
//     })
//   } else if (request.body.searchtype === 'tag'){
//     Snippet.find({tags: request.body.search}, function(err, searchResults) {
//       if (searchResults.length === 0) {
//         response.render('main', {
//           noResults: "Sorry, we can't find any snippets that matches your search.",
//           username: request.session.who[0].username
//         })
//       } else {
//         response.render('main', {
//           snippets: searchResults,
//           username: request.session.who[0].username
//         })
//       }
//     })
//   } else {
//     response.render('main', {
//       noResults: "Sorry, we can't find any snippets that matches your search."
//     })
//   }
// })
//
// server.post('/filter', function(request, response) {
//   if (request.body.filtertype === 'all') {
//     Snippet.find({}, function(err, results) {
//       if (results.length === 0) {
//         response.render('main', {
//           noResults: "Sorry, we can't find any snippets that matches your search.",
//           username: request.session.who[0].username
//         })
//       } else {
//         response.render('main', {
//           snippets: results,
//           username: request.session.who[0].username,
//           })
//       }
//     })
//   } else if (request.body.filtertype === 'mine') {
//     Snippet.find({owner: request.session.who[0].username}, function(err, results){
//       if (results.length === 0) {
//         response.render('main', {
//           noResults: "Sorry, we can't find any snippets that matches your search.",
//           username: request.session.who[0].username
//         })
//       } else {
//         response.render('main', {
//           snippets: results,
//           username: request.session.who[0].username,
//           })
//       }
//     })
//   } else if (request.body.filtertype === 'friends') {
//     Snippet.find({owner: {$nin: request.session.who[0].username}}, function(err, results){
//       if (results.length === 0) {
//         response.render('main', {
//           noResults: "Sorry, we can't find any snippets that matches your search.",
//           username: request.session.who[0].username
//         })
//       } else {
//         response.render('main', {
//           snippets: results,
//           username: request.session.who[0].username,
//           })
//       }
//     })
//   } else if (request.body.filtertype === 'favorited') {
//     Snippet.find({favorites: !null }, function(err, results) {
//       if (results.length === 0) {
//         response.render('main', {
//           noResults: "Sorry, we can't find any snippets that matches your search.",
//           username: request.session.who[0].username
//         })
//       } else {
//         response.render('main', {
//           snippets: results,
//           username: request.session.who[0].username,
//           })
//       }
//     })
//   }
// })
//
// server.post('/sort', function(request, response) {
//   if (request.body.sorttype === 'dateascending') {
//   Snippet.find().sort({timestamp: -1}).then(function(results) {
//     response.render('main', {
//       snippets: results,
//       username: request.session.who[0].username,
//       })
//     })
//   } else if (request.body.sorttype === 'datedescending') {
//   Snippet.find().sort({timestamp: 1}).then(function(results) {
//     response.render('main', {
//       snippets: results,
//       username: request.session.who[0].username,
//       })
//     })
//     } else if (request.body.sorttype === 'mostfavorited') {
//       Snippet.find({}, function(err, results) {
//         results.sort(function(a,b){
//           return a.favoritedBy.length < b.favoritedBy.length;
//         })
//         response.render('main', {
//       snippets: results,
//       username: request.session.who[0].username,
//       })
//     })
//   } else if (request.body.sorttype === 'leastfavorited') {
//     Snippet.find({}, function(err, results) {
//       results.sort(function(a,b){
//         return a.favoritedBy.length > b.favoritedBy.length;
//       })
//       response.render('main', {
//     snippets: results,
//     username: request.session.who[0].username,
//     })
//   })
// }
// })
//
// server.post('/favorite/:snippet_id', function(request, response) {
//   Snippet.findOneAndUpdate(
//     { _id : request.params.snippet_id },
//     { $push: {favoritedBy: request.session.who[0].username}})
//     .then(function(results) {
//         response.redirect('/main')
//     });
// })
//
// server.post('/logout', function(request, response) {
//   request.session.destroy(function() {
//     response.redirect('/logout')
//   });
// })
//
// //LISTEN TO PORT
server.listen(3000, function() {
  console.log("Gabble gabble!");
})
