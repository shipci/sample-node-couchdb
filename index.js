var express = require("express"),
    nano = require('nano')('http://localhost:5984'),
    app = express();

nano.db.destroy('test');

nano.db.create('test', function(err, body) {
  if(err) {
    console.log('Error creating DB ' + err);
  }
});

var db = nano.db.use('test');

app.get("/", function (req, res) {
  res.send("Hey buddy!");
});

app.get("/:name", function (req, res) {
  db.get(req.params.name, function (err, body) {
    console.log('==========Params.name: ' + req.params.name);
    console.log('==========Body: ' + body);
    if (body === undefined) {
      db.insert({'name': req.params.name}, req.params.name, function(err, b) {
        if (err) {
          console.log('sending a 500 error: ' + err);
          res.send(500);
        } else {
          console.log('NOT sending a 500 error');
          res.send("Created a new thing with name " + req.params.name);
        }
      });
    } else {
      console.log('BODY NOT UNDEFINED - SENT BODY');
      res.send(body);
    }
  });
});

app.listen(3000, function () {
  console.log('Express listening on port 3000');
});
