const express = require("express");
const app = express();
require('./db');
const mongoose = require('mongoose');
const CodeSnippet = mongoose.model('CodeSnippet');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.post('/code_snippets/', (req, res) => {

    const newSnippet = {
        title: req.body.title,
        code: req.body.code
    }
    CodeSnippet.create(newSnippet, (err, snippet) => {
        if(!err){
            res.json(snippet);
        } else{
            res.json({error: 'Create code snippet failed.'});
        }
    })

});

app.post('/code_snippets/:id/comments/', (req, res) => {

    CodeSnippet.findByIdAndUpdate(req.params["id"], {
        "$push": {
           comments: req.body["comment"]
        }
     }, {
        "new": true
     },
     (err, docs) => {
        if (err) {
           res.json({
              "error": "The comment was not successfully added."
           });
        } else {
           res.json({
              "message": "Change was successful",
              "docs": docs
           });
        }
     }
  );


});

app.get('/code_snippets/', async(req, res) => {

    CodeSnippet.find({}, function(err, snippets){
        // if(!err){
        //     console.log("getting code snippets");
        //     console.log(snippets);
        //     res.json(snippets.map(function(ele){
        //             return{
        //                 "title": ele.title,
        //                 "code": ele.code,
        //                 "comment": ele.comment
        //             };
        //         })
        //     );
        // }
        res.json(snippets);
    })

});

const port = 3000;

app.listen(port, () => {console.log(`Server is listening on ${port}`)});
