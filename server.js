const express = require('express');
const path = require('path');

var app = express();

//// view engine setup
//app.set('views', path.join(__dirname, '..', 'views'));
//app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.sendFile(path.join(__dirname+'/public/index.htm'));
});

app.listen(3000, () => { console.log('Listening on port 3000...');  });
