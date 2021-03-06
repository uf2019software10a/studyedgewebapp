var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var examTileSchema = new Schema({
	class: { type: String, required: true },
	exam_num: { type: Number, required: true },
	description: { type: String, required: true },
	start: { type: Date, required: true },
	end: {type: Date, required: true},
	location: String,
	capacity: { type: Number, required: true },
	enrolled: { type: Number, default: 0 },
	tutor: String
});

var userSchema = new Schema({
	name: { type: String, required: true},
	email: { type: String, required: true, unique: true}
});

var reservationSchema = new Schema({
	user_id: { type: Schema.ObjectId, required: true},
	exam_id: { type: Schema.ObjectId, required: true},
	topics: { type: String, default: ""}
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
    this.created_at = currDate;
  next();
});

reservationSchema.pre('save', function(next) {
  /* your code here */
  var currDate = new Date();
  this.updated_at = currDate;
  if(!this.created_at)
    this.created_at = currDate;
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
