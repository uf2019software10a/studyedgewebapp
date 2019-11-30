var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var examTileSchema = new Schema({
	class_name: { type: String, required: true },
	exam_num: { type: Number, required: true },
	description: { type: String, required: true },
	date: { type: Date, required: true }, // use format YYYY-MM-DD
	start_time: {
		start_hr: Number, // 0 - 12
		start_min: Number, // 00, 15, 30, or 45
		start_per: String, // AM or PM
	},
	end_time: {
		end_hr: Number,
		end_min: Number,
		end_per: Number
	},
	location: String,
	capacity: { type: Number, required: true },
	enrolled: { type: Number, default: 0 },
	tutor: String
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
    this.created_at = currDate;
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
var reservation = mongoose.model('reservation', reservationSchema)

// ============================================================
// ATTENTION ==================================================
// ============================================================
// DO NOT FUCKING MOVE THESE OKAY IT WILL BREAK A LOT OF THINGS
//
// ============================================================

userSchema.pre('deleteOne', { document: true, query: false }, function() {
	reservation.deleteOne({user_id: this._id}).exec();
});

examTileSchema.pre('deleteOne', { document: true, query: false }, function() {
	reservation.deleteOne({exam_id: this._id}).exec();
});

var examTile = mongoose.model('examTile', examTileSchema);
var user = mongoose.model('user', userSchema);
module.exports = {
	examTile: examTile,
	user: user,
	reservation: reservation,
}


//
// userSchema.pre('deleteOne', function(next) {
//     reservation.remove({user_id: this._id}).exec();
//     next();
// });
//
// examTileSchema.pre('deleteOne', function(next) {
// 		console.log("calling cascade...");
//     reservation.remove({exam_id: this._id}).exec();
//     next();
// });
