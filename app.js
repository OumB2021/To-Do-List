const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"));

let items = ["Buy Food", "Cook Food", "Workout"];
let workItems = [];


app.get('/', function(req, res){

  let today = new Date();
  
  let options = {
    weekday:"long",
    day:"numeric",
    month:"long"
  }

  let day = today.toLocaleDateString("en-US", options);
  res.render("list", {listTitle : day, newListItems : items});
});

app.get('/work', function(req, res){
  res.render('list', {listTitle : "workList", newListItems : workItems});
});

app.post('/', function(req, res){
  let item = req.body.newItem;
  items.push(item);

  res.redirect('/');
});

app.post('/work', function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect('/work');
})

app.listen(3000, function(){
  console.log('listening on 3000');
})