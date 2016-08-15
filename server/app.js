var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var songs = []; //stores our songs

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));

//Adds current date to song
function currentDate(song){
  var currentDate = new Date();
  song.date = (currentDate.getMonth() + "-" + currentDate.getDate() + "-" + currentDate.getFullYear());
  return song;
}

//Function to check for duplicates
function duplicates(song){
  var duplicate = false;
  for(var i = 0; i < songs.length; i++){
    if(song.title == songs[i].title && song.artist == songs[i].artist){
      duplicate = true;
      return duplicate;
    }
  }
}

/**
 * POST /songs
 *
 * Places song into songs array
 */
app.post('/songs', function (req, res) {
  var song = req.body;

//Check for blank fields and duplicates
  if(song.title == "" || song.artist == "" || duplicates(song) == true) {
    res.sendStatus(400);
    return;
  }

//Add date to current song and push to songs array
  currentDate(song);
  songs.push(song);
  res.sendStatus(200);
});

//DON'T TOUCH
app.get('/songs', function (req, res) {
  res.send(songs);
});

app.get('/*', function (req, res) {
  var file = req.params[0] || '/views/index.html';

  console.log('What is in req.params[0]?', req.params[0]);

  //console.log('dirname: ', __dirname);
  //console.log('path', path.join(__dirname, '../public', file));
  res.sendFile(path.join(__dirname, './public', file));
});

app.listen(app.get('port'), function () {
  console.log('Server now running at port ', app.get('port'));
});
