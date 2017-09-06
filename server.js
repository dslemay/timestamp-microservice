var express = require('express'),
    app = express();

app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname));

app.get('/:timestamp', function(req, res) {
  req.on('error', function(err) {
    console.log(err);
  });

  var query = decodeURI(req.params.timestamp),
      date,
      result = {};
  if (Number(query[0])) {
    date = new Date(Number(query))
  } else {
    date = new Date(query);
  }
  if (date.toDateString() === "Invalid Date") {
    result.unix = null;
    result.natural = null;
  } else {
    result.unix = date.valueOf();
    result.natural = date.toDateString();
  }
  res.send(result);
});

app.on('error', function(err) {
  console.log(err);
});

app.listen(app.get('port'), function() {
  console.log('Node app is listening on port', app.get('port'));
});
