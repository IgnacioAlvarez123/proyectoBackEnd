const express = require('express');
const router = express.Router();
const ProductManager = require('../ProductManager.js');

const productManager = new ProductManager('products.json');

router.get("/", (req, res) => {
    const products = productManager.getProducts();
    res.render("home", { products });
});

router.get("/realtimeproducts", (req, res) => {
    const products = productManager.getProducts();
    res.render("realTimeProducts", { products });
});

module.exports = router;