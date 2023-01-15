const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended:true }));

app.get('/', function(req, res){

  var today = new Date();
  if (today.getDay() === 6 || today.getDay() === 0){
    res.send ("Yay it's the weekend");
  } else {
    res.send("I work today");
  }
});

app.listen(3000, function(){
  console.log('listening on 3000');
})