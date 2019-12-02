'use strict';

const MongoClient = require('mongodb').MongoClient;
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    examTile = require('../server/models/schema.js').examTile,
    user = require('../server/models/schema.js').user,
    config = require('../server/config/config');


const client = new MongoClient(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {

   // ADD EXAMS ================================================================
  const collection_exams = client.db("test").collection("examtiles");

  let rawExamData = fs.readFileSync('./exams.json');
  let exams = JSON.parse(rawExamData);
  var examsArr = exams.entries;
  examsArr.forEach(function(element) {
    var exam = new examTile({
    	class: element.class,
    	exam_num: element.exam_num,
      description: element.description,
    	start: element.start,
    	end: element.end,
    	location: element.location,
    	capacity: element.capacity,
    	enrolled: element.enrolled,
    	tutor: element.tutor
    });

    // Add to database
    collection_exams.insertOne(exam, function(err, res) {
      console.log("inserting... " + exam.class + " (num " + exam.exam_num + ")");
      if (err) throw err;
      client.close();
    });
  });


  // ADD USERS =================================================================
  const collection_users = client.db("test").collection("users");

  let rawUserData = fs.readFileSync('./user.json');
  let users = JSON.parse(rawUserData);
  var usersArr = users.entries;
  usersArr.forEach(function(element) {
    var tmp = new user({
    	name: element.name,
      exam_id: element.exam_id !== 'undefined' ? element.exam_id : [],
    	email: element.email
    });

    // Add to database
    collection_users.insertOne(tmp, function(err, res) {
      console.log("inserting... " + tmp.name + " (email " + tmp.email + ")");
      if (err) throw err;
      client.close();
    });
  });

  client.close();
});
