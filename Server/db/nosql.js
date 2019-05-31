
var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/mydatabase',{useNewUrlParser: true});

mongoose.connect('mongodb://localhost/MyDrivers', {useNewUrlParser: true},(error) => {
	if (error) {
		console.log("Error " + error);
	} else {
		console.log("Connected successfully to server")
	}
});


var userSchema = new mongoose.Schema({
	userID: Number,
	
	userName:  String,

	email: String,
	
	password: {
		type: String,		
	},
	avt: {
		type: String,		
	},
	BienSoXe: {
		type: String,		
	},
	hinhXe: {
		type: String,	
		default: null
	},
	role: {
		type: String,		
		default: 'user'
	},
	dateAdded: {
		type: Date,
		default: Date.now
	},
	verify: {
		type:  Number,
		default: 0
	},
});

const User = mongoose.model('user', userSchema);


exports.User = User;


var localSchema = new mongoose.Schema({
	
	local_X: {
		type:  Number,
		default: 0
	},
	local_Y: {
		type:  Number,
		default: 0
	},
	dateAdded: {
		type: Date,
		default: Date.now
	},
	
});

const Local = mongoose.model('local', localSchema);


exports.Local = Local;

// const TaiXeSchema = new mongoose.Schema({
//     Name: String,
//     Avt: String,
//     BienSoXe: String,
//     HinhXe: String,
//     NgayTao: {type: Date, default: Date.now}
// });
// const userSchema = new mongoose.Schema({
//     name:String,
//     age: Number
// });
// // var user =  mongoose.model('TaiXe',TaiXeSchema);
// const user = mongoose.model('user',userSchema );
// // user.create([
// //     {name:"teo", age:20},
// //     {name:"tun", age:25}
// // ])
// module.exports = user.find().exec((err,users)=>{
//     console.log(users);
// });

// user.update({name:"teo"},{name:"taotaoatp"})
// .exec((err,result)=>
// {
//     console.log(result)
// })
// user.find().exec((err,users)=>{
//     console.log(users);
// })