const fs = require('fs');

class CartManager {
    constructor(path) {
        this.path = path;
        this.cartIdCounter = 1;
        this.carts = this.getAllCarts();
    }

    generateUniqueId() {
        let highestId = 0;
        this.carts.forEach(cart => {
            if (cart.id > highestId) {
                highestId = cart.id;
            }
        });
        return highestId + 1;
    }

    getAllCarts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.log('Error al cargar carritos desde archivo:', error.message);
            return [];
        }
    }

    async getCartById(id) {
        const carts = await this.getAllCarts();
        const cart = carts.find(cart => cart.id === id);
        if (cart) {
            if (!cart.product) {
                cart.product = [];
            }
            return cart;
        } else {
            console.log("Carrito no encontrado.");
            return null;
        }
    }

    async saveProductsPost(cart) {
        try {
            const existingCarts = await this.getAllCarts();

            const existingCartIndex = existingCarts.findIndex(existingCart => existingCart.id === cart.id);

            if (existingCartIndex !== -1) {
                const existingCart = existingCarts[existingCartIndex];
                const existingProductIndex = existingCart.products.findIndex(item => item.product === cart.product.product);

                if (existingProductIndex !== -1) {
                    existingCart.products[existingProductIndex].quantity++;
                } else {
                    existingCart.products.push({ product: cart.product.product, quantity: 1 });
                }
            } else {
                existingCarts.push(cart);
            }

            await this.saveCartsToFile(existingCarts);

            console.log('Carrito guardado en archivo correctamente.');
        } catch (error) {
            console.log('Error al guardar el carrito en el archivo:', error.message);
            throw error;
        }
    }

    async saveCartsToFile(carts) {
        return new Promise((resolve, reject) => {
            const data = JSON.stringify(carts, null, 2);
            fs.writeFile(this.path, data, error => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
    async saveProducts(cartId, productId) {
        try {
            let carts = this.getAllCarts();
            const cartIndex = carts.findIndex(cart => cart.id === cartId);

            if (cartIndex !== -1) {
                const cart = carts[cartIndex];
                const existingProduct = cart.product.find(item => item.product === productId);

                if (existingProduct) {
                    existingProduct.quantity++;
                } else {
                    cart.product.push({ product: productId, quantity: 1 });
                }

                fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
                console.log('Cambios en el carrito guardados en el archivo correctamente.');
            } else {
                console.log('Carrito no encontrado.');
            }
        } catch (error) {
            console.log('Error al guardar los cambios en el carrito en el archivo:', error.message);
        }
    }
}
module.exports = CartManager;
