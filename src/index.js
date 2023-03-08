
import ProductManager from "./ProductManager.js";

let manager = new ProductManager ();

//Segundo Test:

const EjecutApp = async () =>{
    await manager.getProduct();
    await manager.addProduct('producto prueba','Este es un producto prueba','200', 'Sin imagen', "abc123",'25',);
    await manager.getProduct();
    await manager.getProductById(3);
    await manager.getProductById(1);
    await manager.updateProductById(1 , {
            title: "2",
        	description: 'este es el cambio de prueba 2',
        	price: '330',
        	code: 'abc387',
        	stock: 44
    });
    await manager.getProductById(1);
    // await manager.deleteProduct(3);
    // await manager.deleteProduct(1);
    // await manager.getProduct(1);
   
}

EjecutApp();

