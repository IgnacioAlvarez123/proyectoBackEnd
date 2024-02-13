const ProductManager = require('./ProductManager');


let products = [
    {
        id: 1,
        title: "Silla de Oficina Ergonómica",
        description: "Silla de oficina con soporte lumbar ajustable",
        price: 149.99,
        thumbnail: "silla_oficina.jpg",
        code: "SO001",
        stock: 30
    },
    {
        id: 2,
        title: "Set de Herramientas de Mano",
        description: "Kit de herramientas para bricolaje doméstico",
        price: 79.99,
        thumbnail: "herramientas.jpg",
        code: "HM002",
        stock: 25
    },
    {
        id: 3,
        title: "Cafetera de Goteo Programable",
        description: "Cafetera con temporizador y capacidad para 12 tazas",
        price: 39.99,
        thumbnail: "cafetera.jpg",
        code: "CG003",
        stock: 20
    },
    {
        id: 4,
        title: "Mochila Impermeable para Senderismo",
        description: "Mochila con capacidad de 40 litros y cubierta impermeable",
        price: 69.99,
        thumbnail: "mochila.jpg",
        code: "MS004",
        stock: 15
    },
    {
        id: 5,
        title: "Juego de Cuchillos de Cocina",
        description: "Set de cuchillos de acero inoxidable con bloque de madera",
        price: 49.99,
        thumbnail: "cuchillos.jpg",
        code: "CC005",
        stock: 20
    },
    {
        id: 6,
        title: "Auriculares Bluetooth Deportivos",
        description: "Auriculares inalámbricos para deportes con cancelación de ruido",
        price: 29.99,
        thumbnail: "auriculares.jpg",
        code: "AB006",
        stock: 35
    },
    {
        id: 7,
        title: "Batería Externa Portátil",
        description: "Cargador portátil de 20000mAh con doble puerto USB",
        price: 24.99,
        thumbnail: "bateria_externa.jpg",
        code: "BE007",
        stock: 40
    },
    {
        id: 8,
        title: "Robot Aspirador Inteligente",
        description: "Aspiradora robótica con navegación inteligente y control por voz",
        price: 199.99,
        thumbnail: "aspiradora.jpg",
        code: "RA008",
        stock: 10
    },
    {
        id: 9,
        title: "Teclado Mecánico para Gaming",
        description: "Teclado retroiluminado con interruptores mecánicos y reposamuñecas",
        price: 89.99,
        thumbnail: "teclado.jpg",
        code: "TM009",
        stock: 15
    },
    {
        id: 10,
        title: "Impresora Multifuncional WiFi",
        description: "Impresora todo-en-uno con conexión inalámbrica y escáner automático",
        price: 129.99,
        thumbnail: "impresora.jpg",
        code: "IM010",
        stock: 20
    }
];

async function main() {
    try {
        const productManager = new ProductManager('products.json');

        for (let product of products) {
            await productManager.addProduct(product);
        }

        console.log("Productos agregados exitosamente.");
    } catch (error) {
        console.error("Error agregando productos");
    }
}

main();