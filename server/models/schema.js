var profileSchema = new Schema({
	_id: { type: Number, required: true, unique: true },
	class: { type: String, required: true},
	exam_num: { type: Number, required: true},
	start: { type: Date, required: true},
	end: { type: Date, required: true},
	online: { type: Boolean, required: true},
	location: {
		buidling: String,
		floor: String,
		description: String
	},
	capacity: { type: Number, required: true},
	enrolled: { type: Number, required: true, default: 0},
	tutor: String, //This is going to be the Tutor's name & allows for tutor to be assigned a later date
});

var userSchema = new Schema({
	name: { type: String, required: true},
	exams: Number, //This is going to be an array of the _id that the student is enrolled in
	email: { type: String, required: true, unique: true}
});
