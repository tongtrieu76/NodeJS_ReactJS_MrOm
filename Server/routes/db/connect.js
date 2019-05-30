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
	userID: {
		type: String,
		default: "no_name"
	}
	
});
var Local = new mongoose.model('local', Schemalocal);
setInterval(function(){
	Local = new mongoose.model('local', Schemalocal);
},1000);

exports.Local = Local;