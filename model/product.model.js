const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productname: {
        type: String,
    },
    description: {
        type: String,
    }
})

const ProductModel = mongoose.model("product", productSchema)

module.exports = {
    ProductModel
}
