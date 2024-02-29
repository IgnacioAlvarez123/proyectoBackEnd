const express = require('express');
const router = express.Router();
const ProductManager = require('../src/ProductManager');

const productManager = new ProductManager('./src/products.json');

router.get('/', (req, res) => {
    const products = productManager.getProducts();
    res.json(products);
});

router.get('/:pid',async (req, res) => {
    const productId = parseInt(req.params.pid);
    if (isNaN(productId)) {
        return res.status(400).json({ error: 'ID de producto no válido' });
    }
    const product = await productManager.getProductById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

router.post('/',async (req, res) => {
    const { title, description, code, price, status, stock, category  } = req.body;

    if (!title || !description || !code || !price || status === undefined || !stock || !category) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios y deben tener el tipo correcto.' });
    }

    const newProduct = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
    };

    try {
        const productId = await productManager.addProduct(newProduct);
        res.status(201).json({ message: 'Producto agregado correctamente', productId });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

router.put('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    if (isNaN(productId)) {
        return res.status(400).json({ error: 'ID de producto no válido' });
    }
    const { title, description, code, price, status, stock, category, categorys } = req.body;

    if (!title || !description || !code || !price || status === undefined || !stock || !category ) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios y deben tener el tipo correcto.' });
    }

    const updatedProduct = {
        id: productId,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
    };

    try {
        const result = productManager.updateProduct(productId, updatedProduct);
        if (result) {
            res.json({ message: 'Producto actualizado correctamente', updatedProduct });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

router.delete('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    if (isNaN(productId)) {
        return res.status(400).json({ error: 'ID de producto no válido' });
    }
    try {
        const result = productManager.deleteProduct(productId);
        if (result) {
            res.json({ message: 'Producto eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

module.exports = router;
