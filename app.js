const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"));

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/todolistDB', {useNewUrlParser: true});


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

var defaultsItems = [item1, item2, item3];

let workItems = [];


// Home page
app.get('/', function(req, res){

  let today = new Date();
  
  let options = {
    weekday:"long",
    day:"numeric",
    month:"long"
  }
  
  var day = today.toLocaleDateString("en-US", options);
  
  dbItems.find({}, function (err, foundItems){

    console.log("Items added")
    if (foundItems.length === 0){

      dbItems.insertMany([item1, item2, item3], function(err){

        if (err) {console.log(err.message)} 
        else {console.log("Items added successfully")}
      });

      res.redirect('/');
    }
    else {
      res.render("list", {listTitle : day, newListItems : foundItems});
    }
  });
});

// Work page
app.get('/work', function(req, res){
  res.render('list', {listTitle : "Work List", newListItems : workItems});
});

// Post request on home page
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

// Post request on work page
app.post('/work', function(req, res){
  res.redirect('/work');
})

// About page
app.get('/about', function(req, res){
  res.render('about');
});

app.listen(3000, function(){
  console.log('listening on 3000');
})