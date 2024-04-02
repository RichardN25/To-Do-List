const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(_, res) {
    res.render('list', {
        listTitle: date.getDate(),
        listItems: items
    });
})

app.post('/', function(req, res) {
    const item = req.body.newItem;
    if (req.body.list === 'Work') {
        workItems.push(item);
        res.redirect('/work');
    }
    else {
        items.push(item);
        res.redirect('/');
    }
})

app.get('/work', function(_, res) {
    res.render('list', {
        listTitle: 'Work', 
        listItems: workItems
    })
})

app.get('/about', function(_, res) {
    res.render('about');
})

app.listen(process.env.PORT || 3000, function()  {
    console.log('Server is running on port 3000');
})