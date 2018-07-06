const express = require("express");
const fs = require("fs");
const app = express();
app.listen(4300, function() {
  console.log('REST Mock API Server started!');

  app.route('/api/:type').get(function(req, res) {
    console.log("User API GET Request...");
    fs.readFile(__dirname + '/assets/api/'+ req.params['type'] +'.json', 'utf8', function(err, data) {
      if (err) {console.log(err); throw err;}
      var json = JSON.parse(data);
      res.send(json);
    });
  });

  app.route('/api/:type/:id').get(function(req, res) {
    console.log("User API GET Request for id...");
    fs.readFile(__dirname + '/assets/api/'+ req.params['type'] +'.json', 'utf8', function(err, data) {
      if (err) {console.log(err); throw err;}
      var json = JSON.parse(data);
      var id = Number.parseInt(req.params['id']);
      json.forEach(function(obj) {
        console.log(obj);
        obj['Id'] === id ? res.send(obj) : null;
      });
    });
  });
});

app.route('/api/:type/:property/:value').get(function(req, res) {
  console.log("User API GET Request for id...");
  fs.readFile(__dirname + '/assets/api/'+ req.params['type'] +'.json', 'utf8', function(err, data) {
    if (err) {console.log(err); throw err;}
    var json = JSON.parse(data);
    var property = req.params['property'];
    var value = req.params['value'];
    var results = [];
    json.forEach(function(obj) {
      obj[property].toString().includes(value) ? results.push(obj) : null;
    });
    res.send(results);
  });
});
