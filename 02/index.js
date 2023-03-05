
const ProductManager = require ("./ProductManager");

let manager = new ProductManager ();

//Segundo Test:

const EjecutApp = async () =>{
    await manager.getProduct();
    //await manager.addProduct('producto prueba','Este es un producto prueba','200', 'Sin imagen', "abc123",'25',);
//     await manager.getProduct();
//     await manager.getProductById(3);
//     await manager.getProductById(1);
    //await manager.updateProduc(1,'producto prueba2','Este es un producto prueba2','2002', 'Sin imagen2', "abc1232",'252',);
    //await manager.deleteProduct(3);
    await manager.deleteProduct();
   
}

EjecutApp();

