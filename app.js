var express = require('express');
var bodyParser = require('body-parser'); //required for parsing post data from client
var cors = require('cors');
path = require('path');






var app = express();

var port = process.env.PORT || 3000;

app.use('/index', require('./routes/index'));
app.use('/friends', require('./routes/friends'));
app.use('/profile', require('./routes/profile'));
app.use('/group', require('./routes/group'));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.render("index");
});

app.listen(port, function(){
  console.log("Server is using gulp and is up at : "+ port);
});
