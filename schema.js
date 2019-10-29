var profileSchema = new Schema({
	_id: Number,
	class: String,
	exam_num: Number,
	date_time: Date,
	online: Bool,
	capacity: Number,
	enrolled: Number,
	tutor: Number,
});

var userSchema = new Schema({
	name: String,
	exams: {Number, Number, Number, Number, Number, Number},
	email: String
});