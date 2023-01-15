const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended:true }));

app.get('/', function(req, res){

  var today = new Date();
  var day = "";
  if (today.getDay() === 6 || today.getDay() === 0){
    day = "weekend";
    res.render("list", {kindOfDay:day});
  } else {
    day = "week day";
    res.render("list", {kindOfDay:day});
  }
});

app.listen(3000, function(){
  console.log('listening on 3000');
})