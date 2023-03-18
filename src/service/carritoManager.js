import fs from 'node:fs'


class cartManager {
    
  
   
  constructor() {
        this.carts = [];
        this.productDir = "./src/file";
        this.path = this.productDir + "/carrito.json";     
    
    }
    
    addCart = async (id) => {   
      await fs.promises.mkdir(this.productDir,{recursive: true})        
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, "[]");
      }
      let newCart = {
        id,
        product: []
      }
      try {
        let cartsFile = await fs.promises.readFile(this.path, "utf-8");
        this.carts = JSON.parse(cartsFile)
        if (this.carts.length>0) {
          newCart.id = this.carts[this.carts.length-1].id+1
        } else {
          newCart.id = 1
        }
        
        this.carts.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2)) 
        console.log(newCart)
        return 'carrito cargado'
        
      } catch (error) {
        throw Error (`No se puede encontrar el producto, verifique  ${this.productDir}, detalle del error ${error}`);
    }
  }
    getCartById = async (id) => {
    try {
      await fs.promises.mkdir(this.productDir,{recursive: true})
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, "[]");
      }
      let cartsFile = await fs.promises.readFile(this.path, "utf-8");
      this.carts = JSON.parse(cartsFile)
  
    let founded = this.carts.find(prod => prod.id === id)
    if (founded){
      console.log(founded)
      return founded
    } else {
      return 'El carrito no esta en la lista'
    } } catch (error) {
  throw Error (`No se puede encontrar el carrito, verifique  ${this.productDir}, detalle del error ${error}`);
  }
  }
  addProductToCart = async (id,productId) => {
    try {
     
      let cartsFile = await fs.promises.readFile(this.path, "utf-8");
      this.carts = JSON.parse(cartsFile)
      const cart = this.carts.filter(c => c.id === id)

      if (cart) {
        let productExist = cart.find(p => p.product === productId)
        if (!productExist) {
          cart.push(
            productExist = {
              product : productId,
              quantity : 1
            }
          )
        } else {
          productExist.quantity++;
        }
          
          
        
      }
      return 'producto cargado'
      
      
    } catch (error) {
      throw Error (`No se puede agregar el producto, verifique  ${this.productDir}, detalle del error ${error}`);
    }

  }






};




let cart = new cartManager ();

export default cart