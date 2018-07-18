var express  = require('express');
var couchbase = require("couchbase");
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(fileUpload());
server.use('/public', express.static(__dirname + '/public'));

server.post("/new_blog", function (request, response){
var name = request.body.name;
var title = request.body.title;
var category = request.body.category;
//var filepath = request.body.filpath;
var content = request.body.content;
var filename = request.body.filename;
var file = request.files.file;
var blog_id = "blog_"+new Date().getTime();
console.log(name+", "+title+", "+category+", "+filename+", "+file);
file.mv(`${__dirname}/uploaded_images/${blog_id}.jpg`, function(err) {
  if(err) {
    //return response.status(500).send(err);
    console.log(err);
  }
  blog_object = {
    'name' : name,
    'title' : title,
    'category' : category,
    'content' : content,
    'filename' : blog_id+".jpg"
  }
  var cluster = new couchbase.Cluster('127.0.0.1');
  cluster.authenticate('Administrator', 'tarun123');

  var bucket = cluster.openBucket('blog_data', function(err){
    if(err){
      console.log("Unable to make a connection to couchbase server.");
    }
    bucket.insert(blog_id, blog_object, function(err, result) {
      if (!err) {
        console.log("stored document successfully. CAS is %j", result.cas);
        console.log("result is: "+result);
        //return blog_object;
        response.send(blog_object);
      } else {
        console.error("Couldn't store document: %j", err);
      }
    });
  });
  //response.json("File Uploaded");
});
//console.log(username, topic, category, bcontent, filename,file);
//console.log(filepath,fileinput);
});


server.post('/upload', (req, res, next) => {
  console.log("You have reached to your backend server.");
  console.log(req);
  let imageFile = req.files.file;

  imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, function(err) {
    if (err) {
      return res.status(500).send(err);
      console.log(err);
    }

    res.json({file: `public/${req.body.filename}`});
  });

});

server.get("/all_blogs", function (request, response){
  var cluster = new couchbase.Cluster('127.0.0.1');
  cluster.authenticate('Administrator', 'tarun123');
  var bucket = cluster.openBucket('blog_data', function(err){
    if(err){
      console.log("Unable to make a connection to couchbase server.");
    }
    console.log("Connection Successful.");
    var N1qlQuery = couchbase.N1qlQuery;
    var q = N1qlQuery.fromString('select name, title, content, filename, category from blog_data');
    var count = 0;
    bucket.query(q, function (err, rows){
      console.log("Total Record count:  "+rows.length);
      response.send(rows);
    });
  });
});

server.post("/new_blog_old", function (request, response){
  var input = request;
  blog_object = {
    'username' : input.query.username,
    'topic' : input.query.btopic,
    'category' : input.query.bcategory,
    'content' : input.query.bcontent,
    'filepath' : input.query.bfilepath
  }
  var blog_id = "blog_"+new Date().getTime();

  var cluster = new couchbase.Cluster('127.0.0.1');
  cluster.authenticate('Administrator', 'tarun123');

  var bucket = cluster.openBucket('blog_data', function(err){
    if(err){
      console.log("Unable to make a connection to couchbase server.");
    }
    bucket.insert(blog_id, blog_object, function(err, result) {
      if (!err) {
        console.log("stored document successfully. CAS is %j", result.cas);
        console.log("result is: "+result);
        //return blog_object;
        response.send(blog_object);
      } else {
        console.error("Couldn't store document: %j", err);
      }
    });
  });

});

//Start nodejs backend server on port 5000 -- port defined under blog-application/package.json
server.listen(5000, function () {
  console.log("Working on port 5000");
});
