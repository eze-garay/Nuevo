class ProductManager {


    
  constructor(){
      this.products = []
  
  }
  
  addProduct (title, description, price, thumbnail, code, stock, id) {
      

      let Product = {

          title : title,
      
          description : description,
      
          price : price,
      
          thumbnail : thumbnail,
      
          code : code,
      
          id : id,
      
          stock : stock,
      }
      
      for (const element of this.products) {
      if (element.code === Product.code){
          return 'El elemento ya esta cargado' 
      } else if (Product.title === '' || Product.description === '' || Product.price === '' || Product.thumbnail === ''|| Product.id === 0 || Product.stock < 0) {
          return 'Todos los campos son necesarios'
      }}
                  
      

  
  if (this.products.length === 0) {
      id =1;
  } else {
      id = this.products[this.products.length -1].id +1
  }
  
  Product.id = id;
  
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
  




// Pruebas realizadas


  
const manager = new ProductManager ();
  
 console.log(manager);
 console.log(manager.addProduct());
 console.log(manager.addProduct('producto prueba','Este es un producto prueba','200','Sin imagen',"abc123",25));
 console.log(manager.getProducts());
 console.log(manager.addProduct('producto prueba','Este es un producto prueba','200','Sin imagen',"abc123",25));

 console.log(manager.getProductsbyId());

 console.log(manager.getProductsbyId(2));






    


