const ProductManager = require('./ProductManager');

async function Prueba() {
    try {
        const productManager = new ProductManager('products.json');

        const newProductId = await productManager.addProduct({
            id:11,
            title: "Nuevo Producto",
            description: "Descripción del nuevo producto",
            price: 99.99,
            thumbnail: "nuevo_producto.jpg",
            code: "NP001",
            stock: 10
        });
        console.log("Nuevo producto agregado con ID:", newProductId);

        const allProducts = await productManager.getProducts();
        console.log("Todos los productos:", allProducts);

        const foundProduct = await productManager.getProductById(3);
        console.log("Producto encontrado por ID", 3, ":", foundProduct);


        await productManager.updateProduct(2, { price: 89.99 });
        console.log("Producto actualizado con ID:", 2);

        await productManager.deleteProduct(5);
        console.log("Producto eliminado con ID:", 5);

        const productosRestantes = await productManager.getProducts();
        console.log("Productos restantes:", productosRestantes);
    } catch (error) {
        console.error("Error:");
    }
}


Prueba();