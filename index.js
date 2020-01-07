const express = require('express');
const routes = require('./routes');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use('/', routes);
app.use((err, req, res, next) => {
    console.log(`A ${err.code} error occured with message: ${err.message}`);
    res.status(err.code).send(err);
})

app.listen(port, () => console.log('server is running...'));