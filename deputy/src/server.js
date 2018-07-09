const express = require("express");
var bodyParser = require('body-parser');
const fs = require("fs");
const app = express();
app.use(bodyParser.json());
app.listen(4300, function() {
  console.log('REST Mock API Server started!');

  app.route('/api/:type').get(function(req, res) {
    console.log("User API GET Request...");
    fs.readFile(__dirname + '/assets/api/'+ req.params['type'] +'.json', 'utf8', function(err, data) {
      if (err) {console.log(err); throw err;}
      var json = JSON.parse(data);
      res.send(json);
    });
  }).post(function(req, res) {
    console.log("User API POST Request...");
    var filepath = __dirname + '/assets/api/' + req.params['type'] + '.json';
    fs.readFile(filepath, 'utf8', function(err, data) {
      if (err) {console.log(err); res.send(false)}
      var json = JSON.parse(data);
      var body = req.body;
      if (body.isAdd) {
        json.unshift(body.data)
      } else {
        for (var i = 0; i < json.length; i++) {
          if (body.data.Id === json[i].Id) {
            json.splice(i,1);
          }
        }
        res.send(false);
      }
      fs.writeFile(filepath, JSON.stringify(json), 'utf8', function (werr) {if (werr) {console.log(werr); res.send(false)}
      });
      res.send(true);
    });
    res.send(false);
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

  app.route('/api/:type/:property/:value/:comparator').get(function(req, res) {
    console.log("User API GET Request for id...");
    fs.readFile(__dirname + '/assets/api/' + req.params['type'] +'.json', 'utf8', function(err, data) {
      if (err) {console.log(err); throw err;}
      var json = JSON.parse(data);
      var property = req.params['property'];
      var value = req.params['value'];
      var comparator = req.params['comparator'];
      var results = [];
      json.forEach(function(obj) {
        comparator === 'like' ? obj[property].toString().includes(value) ? results.push(obj) : null :
          obj[property].toString() == value ? results.push(obj) : null;
      });
      res.send(results);
    });
  });
});

