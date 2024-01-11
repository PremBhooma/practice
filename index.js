const express = require("express");
const cors = require("cors");

const { CategoryModel } = require("./model/category.model");
const { ProductModel } = require("./model/product.model");
const { connection } = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.get('/', (req, res) => {
    res.send('Home Route');
});

app.get("/category", async (req, res) => {
    const categories = await CategoryModel.find();
    res.send({ categories });
});

app.post('/category', async (req, res) => {
    const { categoryname } = req.body;
    const new_category = new CategoryModel({
        categoryname
    });
    try {
        await new_category.save();
        res.send({ msg: "Category Created" });
    } catch (err) {
        console.log(err);
        res.send({ message: "Category Not Created" });
    }
});

app.get("/product", async (req, res) => {
    const { categoryname } = req.query;

    let products;

    if (categoryname) {
        // If a category is specified, filter products based on the category
        const category = await CategoryModel.findOne({ categoryname });

        if (category) {
            products = await ProductModel.find({ category: category._id });
        } else {
            return res.send({ message: "Category not found" });
        }
    } else {
        // If no category is specified, fetch all products
        products = await ProductModel.find();
    }

    res.send({ products });
});

app.post('/product', async (req, res) => {
    const { categoryname, productname, description, details } = req.body;

    const category = await CategoryModel.findOne({ categoryname });

    if (!category) {
        return res.send({ message: "Category not found" });
    }

    const new_product = new ProductModel({
        productname,
        description,
        details,
        category: category._id,
    });

    try {
        await new_product.save();
        res.send({ msg: "Product Created" });
    } catch (err) {
        console.log(err);
        res.send({ message: "Product Not Created" });
    }
});

app.listen(8080, async () => {
    try {
        await connection;
        console.log("DB Success to Connected");
    } catch (err) {
        console.log("DB Failed to Connect");
        console.log(err);
    }
    console.log(`Server is running at 8080`);
});
