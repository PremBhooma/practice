const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productname: {
        type: String,
    },
    description: {
        type: String,
    },
    details: {
        type: mongoose.Schema.Types.Mixed // This can hold dynamic properties like colors, sizes, etc.
    }
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = {
    ProductModel
};
