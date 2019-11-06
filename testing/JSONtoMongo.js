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
  const collection_exams = client.db("test").collection("exams");

  let rawExamData = fs.readFileSync('./exams.json');
  let exams = JSON.parse(rawExamData);
  var examsArr = exams.entries;
  examsArr.forEach(function(element) {
    var exam = new examTile({
    	exam_id: element.exam_id,
    	class: element.class,
    	exam_num: element.exam_num,
    	start: element.start,
    	end: element.end,
    	online: element.online,
    	location: {
    		building: element.location.building,
    		floor: element.location.floor,
    		description: element.location.description
    	},
    	capacity: element.capacity,
    	enrolled: element.enrolled,
    	tutor: element.tutor
    });

    // Add to database
    collection_exams.insertOne(exam, function(err, res) {
      if (err) throw err;
      console.log("inserting... " + exam.class + " (num " + exam.exam_num + ")");
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
      if (err) throw err;
      console.log("inserting... " + tmp.name + " (email " + tmp.email + ")");
      client.close();
    });
  });

  client.close();
});
