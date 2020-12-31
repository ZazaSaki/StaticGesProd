const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
mongoose.connect('mongodb+srv://StaticGestProg:qTGnCDywBq6jbco9@cluster0.3eqaz.mongodb.net/bank?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//

app.use(express.json());
app.use(routes);

app.listen(3333);