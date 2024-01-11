const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    categoryname: {
        type: String,
    }
})

const CategoryModel = mongoose.model("category", categorySchema)

module.exports = {
    CategoryModel
}
