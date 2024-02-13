const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    async addProduct(product) {
        try {
            const products = await this.getProductsFromFile();
            product.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
            products.push(product);
            await this.saveProducts(products);
            return product.id;
        } catch (error) {
            throw new Error("Error agregando producto");
        }
    }

    async getProducts() {
        try {
            return await this.getProductsFromFile();
        } catch (error) {
            throw new Error("Error encontrando producto");
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProductsFromFile();
            return products.find(product => product.id === id);
        } catch (error) {
            throw new Error("Error encontrando producto por id");
        }
    }

    async updateProduct(id, actualizarProductos) {
        try {
            const products = await this.getProductsFromFile();
            const index = products.findIndex(product => product.id === id);
            if (index !== -1) {
                products[index] = { ...products[index], ...actualizarProductos};
                await this.saveProducts(products);
            } else {
                throw new Error("Producto no encontrado con id: " + id);
            }
        } catch (error) {
            throw new Error("Error actualizando producto");
        }
    }

    async deleteProduct(id) {
        try {
            let products = await this.getProductsFromFile();
            products = products.filter(product => product.id !== id);
            await this.saveProducts(products);
        } catch (error) {
            throw new Error("Error eliminando el producto: ");
        }
    }

    async getProductsFromFile() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path,  (e, data) => {
                if (e) {
                    if (e.codigo === "ERROR!") {
                        resolve([]);
                    } else {
                        reject(e);
                    }
                } else {
                    try {
                        resolve(JSON.parse(data));
                    } catch (error) {
                        reject(new Error("Error!"));
                    }
                }
            });
        });
    }

    async saveProducts(products) {
        return new Promise((resolve, reject) => {
            const data = JSON.stringify(products, null, 2);
            fs.writeFile(this.path, data, e => {
                if (e) {
                    reject(e);
                } else {
                    resolve();
                }
            });
        });
    }
}


module.exports = ProductManager;