var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MyDrivers',{useNewUrlParser: true},(error) =>{
    if(error){
        console.log(error);
    }
    else
    {
        console.log("kết nối thành công!");
    }
})


//Locations
var SchemaLocations = new mongoose.Schema({
	AccountID: {
		type: String,
		default: "no_id"
	},
	Location_X: {
		type:  String,
		default: "0"
	},
	Location_Y: {
		type:  String,
		default: "0"
	},
	Date: {
		type: Date,
		default: Date.now
	},
	Status: {
		type: Number,
		default: 0
	}
});
var locations = new mongoose.model('location', SchemaLocations);

setInterval(function(){
	locations = new mongoose.model('location', SchemaLocations);
},1000);

//Account
var SchemaAccount = new mongoose.Schema({
	UserName: {
		type: String,
		default: "no_name"
	},
	Password: {
		type: String,
		default: "no_password"
	},
	Name: {
		type: String,
		default: "no_name"
	},
	Status: {
		type: Number,
		default: 96
	},
	WhyLock: {
		type: String,
		default: null
	},
	Token: {
		type: String,
		default: null
	},
	StatusConnect: {
		type: Number,
		default: 0
	},
	OldPassword: [String],
	Rate: {
		type: Number,
		default: 0
	},
	CreateDate: {
		type: Date,
		default: Date.now
	},
	Role: {
		type: Number,
		default: 0
	},
	Image:{
		type: String,
		default: "no_image"
	}
});
var account = new mongoose.model('account',SchemaAccount);


//Information Drivers
var SchemaIfDrivers = new mongoose.Schema({
	AccountID: {
		type: String,
		default: "no_id"
	},
	Birthday: {
		type: Date,
		default: Date.now
	},
	IdentityCard: {
		type: String,
		default: "no_IdentityCard"
	},
	Address: {
		type: String,
		default: "no_Address"
	},
	Email: {
		type: String,
		default: "no_Email"
	},
	NumberPhone: {
		type: String,
		default: "no_NumberPhone"
	},
	CarNumber: {
		type: String,
		default: "no_CarNumber"
	},
	CarInformation: {
		type: String,
		default: "no_CarInformation"
	},
	CarLicense: {
		type: String,
		default: "no_CarLicense"
	},
	CarSpecials: {
		type: String,
		default: "no_CarSpecials"
	},
	DateSignup: {
		type: Date,
		default: Date.now
	},
	Rate: {
		type: String,
		default: 5
	},
	ImageBike:{
		type: String,
		default: null
	}
})
var drivers = new mongoose.model('informationdriver',SchemaIfDrivers);
//Information Users
var SchemaIfUsers = new mongoose.Schema({
	AccountID: {
		type: String,
		default: "no_id"
	},
	Birthday: {
		type: Date,
		default: null
	},
	IdentityCard: {
		type: String,
		default: null
	},
	Address: {
		type: String,
		default: "no_Address"
	},
	Email: {
		type: String,
		default: "no_Email"
	},
	NumberPhone: {
		type: String,
		default: "no_NumberPhone"
	},
	Point: {
		type: Number,
		default: 0
	}
})
var users = new mongoose.model('informationuser',SchemaIfUsers);

//trip
var SchemaTrips = new mongoose.Schema({
	diadiemden_X: {
		type: String,
		default: null
	},
	diadiemden_Y: {
		type: String,
		default: null
	},
	diadiemdon_X: {
		type: String,
		default: null
	},
	diadiemdon_Y: {
		type: String,
		default: null
	},
	taixeID: {
		type: String,
		default: null
	},
	userID: {
		type: String,
		default: null
	},
	date: {
		type: Date,
		default: Date.now
	},
	tongtien: {
		type: Number,
		default: 0
	},
	sokm: {
		type: Number,
		default: 0
	},
	status: {
		type: String,
		default: "Hoàn thành"
	}
})
var trips = new mongoose.model('trip',SchemaTrips);

//exports
exports.Locations = locations;
exports.Accounts = account;
exports.InformationDrivers = drivers;
exports.InformationUsers = users;
exports.Trips = trips;