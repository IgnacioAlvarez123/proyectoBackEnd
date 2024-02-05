class ProductsManager {
    constructor() {
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        let id = 1
        if (this.products.length > 0) {
            id = this.products[this.products.length - 1].id + 1
        }

        let newProduct = { id, title, description, price, thumbnail, code, stock }
        this.products.push(newProduct)
    }


    getProducts() {
        return this.products
    }

    getProductById(id) {
        let product = this.products.find(p => p.id === id)
        if (!product) {
            console.log(`No existe el producto con el id ${id}!`)
            return
        }

        return product
    }

}
let product=new ProductsManager()
product.addProduct("Televisor", "42 pulgadas 4k", "500000", "url img televisor", "635654367", "3")
product.addProduct("Licuadora", "Blanca triturador de hielo", "70000", "url img licuadora", "239684343", "6")
product.addProduct("Mouse", "inalambrico negro luces led", "30000", "url img mouse", "781231471", "7")
console.log(product.getProducts())

console.log(product.getProductById(2))
console.log(product.getProductById(3))