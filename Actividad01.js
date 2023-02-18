



class Product {
    
    constructor (title, description, price, thumbnail, id, stock) {
        
        this.title = title;
        
        this.description = description;
        
        this.price = price;
        
        this.thumbnail = thumbnail;
        
        this.id = id;
        
        this.stock = stock;
        
        }
}

class ProductManager {


    
    constructor(){
        this.products = []
    
    }
    
    addProduct (Product) {
    
        for(const element of this.products) {
        
        if (element.id === Product.id) {
        
        return 'El producto ya existe en la lista'
        
        } else
        
        if (Product.title === '' || Product.description === '' || Product.price === '' || Product.thumbnail === ''|| Product.id === 0 || Product.stock < 0 ) {
        
        return 'Todos los campos son necesarios'
        
        }
    
    }
    
    Product.id = Math.random();
    
    this.products.push(Product);
    
    return this.products
    
    }

    getProducts () {
        return this.products;
    }

    getProductsbyId (id) {
        for(const element of this.products) {
            if(element.id === id) {
                return element.title;
            }
        }
        return 'El producto no esta en la lista'

    }
    
}
    







    
    const product1 = new Product ('producto prueba','Este es un producto prueba','200','Sin imagen',"abc123",25);
    
    
    
    
    const manager = new ProductManager ();
    
   console.log(manager);
   console.log(manager.addProduct(Product));
   manager.addProduct(product1);
   console.log(manager.getProducts());
   console.log(manager.addProduct(product1));

   console.log(manager.getProductsbyId());

   console.log(manager.getProductsbyId(product1.id));


   
    
  