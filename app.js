const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/todolistDB', {useNewUrlParser: true});
mongoose.set('strictQuery', true);


const itemsSchema = {
  name : String,
};

const dbItems = mongoose.model('item', itemsSchema);

const item1 = new dbItems({
  name : "Welcome to your todolist!",
});

const item2 = new dbItems({
  name : "Hit the + button to add a new item!",
});

const item3 = new dbItems({
  name : "<-- Hit this to delete the item!",
});

const defaultsItems = [item1, item2, item3];

dbItems.insertMany(defaultsItems, function(err){
  if (err) {console.log(err.message)} 
  else {console.log("Items added successfully")}
});


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
  res.render('list', {listTitle : "Work List", newListItems : workItems});
});

app.post('/', function(req, res){

  let item = req.body.newItem;

  if (req.body.list === "Work List"){
    
    workItems.push(item);
    res.redirect('/work');
  }

  else{
    items.push(item);
    res.redirect('/');
  }

  console.log(req.body)
  
});

app.post('/work', function(req, res){
  res.redirect('/work');
})

app.get('/about', function(req, res){
  res.render('about');
});

app.listen(3000, function(){
  console.log('listening on 3000');
})