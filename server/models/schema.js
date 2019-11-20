var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var examTileSchema = new Schema({
	exam_id: { type: Number, required: true, unique: true },
	class: { type: String, required: true},
	exam_num: { type: Number, required: true},
	start: { type: Date, required: true},
	end: { type: Date, required: true},
	online: { type: Boolean, required: true},
	location: { //This would only be used if not-online
		building: String,
		floor: String,
		description: String
	},
	capacity: { type: Number, required: true},
	enrolled: { type: Number, required: true, default: 0},
	tutor: String //This is going to be the Tutor's name & allows for tutor to be assigned a later date
});

var userSchema = new Schema({
	name: { type: String, required: true},
	exam_id: [{
		type: Array,
		contains: {
			type: Number
		}
	}], //This is going to be an array of the _id that the student is enrolled in
	email: { type: String, required: true, unique: true}
});

var reservationSchema = new Schema({
	user_id: { type: Schema.ObjectId, required: true},
	exam_id: { type: Schema.ObjectId, required: true},
	topics: { type: String, required: true, default: ""}
});

examTileSchema.pre('save', function(next) {
  /* your code here */
  var currDate = new Date();
  this.updated_at = currDate;
  if(!this.created_at)
    this.created_at - currDate;
  next();
});

userSchema.pre('save', function(next) {
  /* your code here */
  var currDate = new Date();
  this.updated_at = currDate;
  if(!this.created_at)
    this.created_at - currDate;
  next();
});

reservationSchema.pre('save', function(next) {
  /* your code here */
  var currDate = new Date();
  this.updated_at = currDate;
  if(!this.created_at)
    this.created_at - currDate;
  next();
});


var examTile = mongoose.model('examTile', examTileSchema);
var user = mongoose.model('user', userSchema);
var reservation = mongoose.model('reservation', reservationSchema)
module.exports = {
	examTile: examTile,
	user: user,
	reservation: reservation,
}
