const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended:true }));

app.get('/', function(req, res){

  var today = new Date();
  var day = "";
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "friday", "saturday"]
  if (today.getDay() === 6 || today.getDay() === 0){
    day = days[today.getDay()];
  } else {
    day = days[today.getDay()];
  }

  res.render("list", {kindOfDay:day});
});

app.listen(3000, function(){
  console.log('listening on 3000');
})