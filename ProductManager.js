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

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.log('Error al cargar productos desde archivo:', error.message);
            return [];
        }
    }


    async getProductById(id) {
        try {
            const products = await this.getProducts();
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
                products[index] = { ...products[index], ...actualizarProductos };
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

    async getProductsFromFile(path) {
        return new Promise((resolve, reject) => {
            // Leer el archivo
            fs.readFile(path, (error, data) => {
                if (error) {
                    if (error.code === 'ENOENT') {
                        resolve([]);
                    } else {
                        reject(error);
                    }
                } else {
                    try {
                        resolve(JSON.parse(data));
                    } catch (parseError) {
                        reject(new Error('Error al analizar los datos JSON'));
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