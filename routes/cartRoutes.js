const express = require('express');
const router = express.Router();
const CartManager = require('../src/CartManager.js');
const ProductManager = require('../src/ProductManager.js');

const cartManager = new CartManager('./src/carrito.json');
const productManager = new ProductManager('./src/products.json');


router.get('/', (req, res) => {
    const products = cartManager.getAllCarts();
    res.json(products);
});

router.post('/', async (req, res) => {
    const newCartId = cartManager.generateUniqueId();
    const newCart = {
        id: newCartId,
        product: req.body
    };

    await cartManager.saveProductsPost(newCart)



    res.status(201).json({ message: 'Carrito creado correctamente', cart: newCart });
});

router.get('/:cid',async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(cartId);
    if (cart) {

        res.json(cart.product);
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);

        await cartManager.saveProducts(cartId, productId);
        res.status(200).json({ message: 'Producto agregado al carrito correctamente' });
    } catch (error) {
        console.log('Error al agregar el producto al carrito:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' }); 
    }
});

module.exports = router;