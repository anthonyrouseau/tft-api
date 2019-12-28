const express = require('express');
const routes = require('./routes');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use('/', routes);

app.listen(port, () => console.log('server is running...'));