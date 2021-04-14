const express = require("express");
const app = express();
const CodeSnippet = require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.post('/code_snippets/', (req, res) => {

});

app.post('/code_snippets/:id/comments/', (req, res) => {


});

app.get('/code_snippets/', (req, res) => {

});

const port = 3000;

app.listen(port, () => {console.log(`Server is listening on ${port}`)});
