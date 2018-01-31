// require mongoose
console.log("from product models 1")
var mongoose = require('mongoose');
// create the schema
var ProductSchema = new mongoose.Schema({
    name: { type: String, unique: [true, "Name should be unique"], required: [true, "Name is required"], minlength: [3, "Name must contain atleast three characters"] },
    type: { type: String, requires: [true, "Type is required"], minlength: [3, "Type must contain atleast three characters"] },
    description: { type: String, requires: [true, "Description is required"], minlength: [3, "Description must contain atleast three characters"] },
    likes: { type: Number, default: 0 },
    skills: []
}, { timestamps: true })

mongoose.model('Product_schema', ProductSchema);

console.log("from product models 2");