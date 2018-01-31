var products = require('../controllers/products.js')
var path = require ('path');
module.exports = function(app){
    app.get('/products', function (req, res) {
        products.show(req,res)
    })
    app.post('/products', function (req, res) {
        console.log("hello")
        products.create(req, res)
    })
    app.delete('/products/:id', function (req, res) {
        products.destroy(req, res)
    })
    app.get('/products/:id', function(req, res) {
        products.get(req, res)
    })
    app.put('/products/:id', function(req, res) {
        products.update(req, res)
    })
    app.patch('/products/:id', function(req, res) {
        products.patchLikes(req, res)
    })
    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./my-Angular-App/dist/index.html"))
    });
    
}