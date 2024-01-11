const express = require("express")
const cors = require("cors")

const { CategoryModel } = require("./model/category.model")
const { connection } = require("./config/db")

const app = express()
app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.get('/', (req, res) => {
    res.send('Home Route')
})


app.get("/category", async (req, res) => {
    const category = await CategoryModel.find()
    res.send({ category: category })
})

app.post('/category', async (req, res) => {
    const { categoryname } = req.body;
    console.log(categoryname)
    const new_category = new CategoryModel({
        categoryname
    })
    try {
        await new_category.save()
        res.send({ msg: "Category Created" })
    } catch (err) {
        console.log(err)
        res.send({ message: "Category Not Created" })
    }
})

app.post('/product', async (req, res) => {
    const { product, description } = req.body;
    const new_product = new ProductModel({
        product,
        description
    })
    try {
        await new_product.save()
        res.send({ msg: "Product Created" })
    } catch (err) {
        console.log(err)
        res.send({ message: "Product Not Created" })
    }
})

app.listen(8080, async () => {
    try {
        await connection
        console.log("DB Success to Connected")
    } catch (err) {
        console.log("DB Failed to Connect")
        console.log(err)
    }
    console.log(`Server is running at 8080`)
})