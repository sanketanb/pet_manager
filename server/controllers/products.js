// var moment = require('moment');

var mongoose = require('mongoose');

var Product = mongoose.model('Product_schema');

module.exports = {
    show: function (req, res) {
        Product.find({}).sort({type: 'asc'}).exec(function (err, products) {
            if (err) {
                console.log("in show serverr", err)
                res.json({ message: "error", data: err.message });
            }
            else {
                console.log('show success')
                res.json({ message: "success", data: products });
            }
        })
    },
    create: function (req, res) {
        console.log("request body", req.body)
        var new_product = new Product({
            name: req.body.name,
            type: req.body.type,
            description: req.body.description
        });
        new_product.skills.push(req.body.skill1);
        new_product.skills.push(req.body.skill2);
        new_product.skills.push(req.body.skill3);
        console.log("new_product getting stored as", new_product)
        new_product.save(function (err) {
            // if (err.code == 110000) {
            //     console.log("ouchhhhhhhhhhhhhhhhhhhhhhhhhhh", err.code);
            //     res.json({ message: "erroru", data: "Name should be a unique" });
            // }
            if (err) {
                console.log("@@@@@@@@@@@@@", err);
                console.log('something went wrong');
                res.json({ message: "error", data: err });
            } else {
                console.log('successfully added a Product!');
                res.json({ message: "success" })
            }
        })
    },
    destroy: function (req, res) {
        Product.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                console.log(err)
                console.log("something went wrong")
                res.json({ message: "error", data: err.errors });
            } else {
                console.log("task destroyed ")
                console.log("this is the destroy id", req.params.id)
                res.json({ message: "success" })
            }
        })
    },
    get: function (req, res) {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ get')
        Product.findOne({ "_id": req.params.id }, function (err, product) {
            console.log("Edit id is", req.params.id)
            console.log(product)
            res.json({ message: "success", data: product });
        })
    },
    update: function (req, res) {
        new_skills=[];
        new_skills.push(req.body.skill1);
        new_skills.push(req.body.skill2);
        new_skills.push(req.body.skill3);
        console.log("new_skills",new_skills)
        Product.update({ "_id": req.params.id }, 
        { $set: { name: req.body.name, type: req.body.type, description: req.body.description, skills:new_skills}  },
            function (err, product) {
                if (err) {
                    console.log("something went wrong")
                    res.json({ message: "error", data: err.errors });
                } else {
                    console.log("product edited ")
                    console.log("this is the edited id", req.params.id)
                    res.json({ message: "success" })
                }
            })
    },
    patchLikes: function (req, res) {
        Product.update({ "_id": req.params.id }, { $inc: {likes:req.body.likes} }, function (err, product) {
            if (err) {
                console.log("something went wrong")
                res.json({ message: "error", data: err.errors });
            } else {
                console.log("this is the edited id", req.params.id)
                res.json({ message: "success"});
            }
        })
    }
}