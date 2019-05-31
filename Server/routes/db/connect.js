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

var Schemalocal = new mongoose.Schema({
	_id: {
		type: String,
		default: "no_id"
	},
	AccountID: {
		type: String,
		default: "no_id"
	},
	Location_X: {
		type:  Number,
		default: 0
	},
	Location_X: {
		type:  Number,
		default: 0
	},
	Date: {
		type: Date,
		default: Date.now
	},
	Status: {
		type: String,
		default: "no_name"
	}
});
var Locations = new mongoose.model('Locations', Schemalocal);
setInterval(function(){
	Locations = new mongoose.model('Locations', Schemalocal);
},1000);

exports.Local = Locations;