
const ProductManager = require ("./ProductManager");


let manager = new ProductManager ();
//primer test 
// console.log(manager);
// console.log(manager.addProduct());
// console.log(manager.addProduct('producto prueba','Este es un producto prueba','200','Sin imagen',"abc123",25));
// console.log(manager.getProducts());
// console.log(manager.addProduct('producto prueba','Este es un producto prueba','200','Sin imagen',"abc123",25));

// console.log(manager.getProductsbyId());

// console.log(manager.getProductsbyId(2));


//Segundo Test:

const EjecutApp = async () =>{
    await manager.addProduct({
        
        title : 'producto prueba',
        
        description : 'Este es un producto prueba',
    
        price : '200',
    
        thumbnail : 'Sin imagen',

    
        code : "abc123",

        stock : '25',
    });
}

EjecutApp();




