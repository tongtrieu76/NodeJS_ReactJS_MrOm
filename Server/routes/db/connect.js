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
	_id: {
		type: String,
		default: "no_id"
	},
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
		default: "no_name"
	}
});
var locations = new mongoose.model('Location', SchemaLocations);
setInterval(function(){
	locations = new mongoose.model('Location', SchemaLocations);
},1000);

//Account
var SchemaAccount = new mongoose.Schema({
	_id: {
		type: String,
		default: "no_id"
	},
	UserName: {
		type: String,
		default: "no_name"
	}
});
var account = new mongoose.model('Account',SchemaAccount);

exports.Locations = locations;
exports.Accounts = account;