
const fs = require ("fs");


class ProductManager {
    
  
   
    constructor() {
        this.product = [];
        this.productDir = "./file";
        this.path = this.productDir + "/Products.json"; 
      
                
    
    }
    
    addProduct = async (title, description, price, thumbnail, code, stock) => {        

      let product = {
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
      }
      
  try {
    await fs.promises.mkdir(this.productDir,{recursive: true})        
    if (!fs.existsSync(this.path)) {
      await fs.promises.writeFile(this.path, "[]");
    }
    let productsFile = await fs.promises.readFile(this.path, "utf-8");
    //console.info("Archivo JSON obtenido");
    //console.log(productsFile)
    this.product = JSON.parse(productsFile)
    if (this.product.length>0) {
      product.id = this.product[this.product.length-1].id+1
    } else {
      product.id = 1
    }
    if (this.product.find((prod) => prod.id == id)) {
      return 'El elemento ya esta cargado'
    } else if (product.title === '' || product.description === '' || product.price <0 || product.thumbnail === ''|| product.stock < 0) {
      return 'Todos los campos son necesarios'
    }
    this.product.push(product);
    //console.log(productsParsed)
    await fs.promises.writeFile(this.path, JSON.stringify(this.product,null,2));
    return 'Producto cargado'
  } catch (error) {
    //console.error(`Error cargando producto nuevo: ${JSON.stringify(product)}, detalle del error :${error}`)
    throw Error (`Error cargando producto nuevo: ${JSON.stringify(this.product,null,2)}, detalle del error :${error}`)
  }

  }

    getProduct = async () =>{
      try {
        await fs.promises.mkdir(this.productDir,{recursive: true})
        if (!fs.existsSync(this.path)) {
          await fs.promises.writeFile(this.path, "[]");
      }

      let productFile = await fs.promises.readFile(this.path, "utf-8");
      console.info("Archivo JSON obtenido desde archivo: ");
      console.log(productFile);
      const productsParsed=JSON.parse(productFile);
      console.log("Productos encontrados: ");
      console.log(productsParsed);
      return productsParsed;
      } catch (error) {
        throw Error (`Error al consultar la lista de productos, verifique el archivo ${this.productDir}, detalle del error ${error}`);
      }
    }


    getProductById = async (id) =>{
      try {
        await fs.promises.mkdir(this.productDir,{recursive: true})
        if (!fs.existsSync(this.path)) {
          await fs.promises.writeFile(this.path, "[]");
        }
      let productFile = await fs.promises.readFile(this.path, "utf-8");
      this.product = JSON.parse(productFile);

      let founded = this.product.find(prod => prod.id === id)
      if (founded){
        console.log(founded)
        return founded
      } else {
        return 'El producto no esta en la lista'
      } } catch (error) {
    throw Error (`No se puede encontrar el producto, verifique  ${this.productDir}, detalle del error ${error}`);
    }
    }


    updateProductById = async (id, updatedData) => {
		
      try {
        let result = await fs.promises.readFile(this.path)
        let parsedRes = await JSON.parse(result)
        let indexes = parsedRes.map(each=> each.id)
        if (indexes.includes(id)) {
          let productToUpdate = parsedRes.map(product => {
            if (product.id == id) {
              Object.assign(product, updatedData)
            }
          })
          await fs.promises.writeFile(this.path, JSON.stringify(productToUpdate,null,2))
          return { status: 200, response: 'actualizado' }
        } else {
          return { status: 404, response: 'no encontrado' }
        }	
      } catch (error) {
        console.log(error)
        return { status: 400, response: 'error' }
      }
  
      }
 
    deleteProduct = async (id) => {
      try {
        const productFile = await fs.promises.readFile(this.path, "utf-8")
        const productsParsed = JSON.parse(productFile);
        const productFounded = await productsParsed.find(product => product.id === id )
  
        if (productFounded) {
          console.log(productsParsed.indexOf(productFounded))
          productsParsed.splice(productsParsed.indexOf(productFounded), 1)
          await fs.promises.unlink(this.path)
          await fs.promises.writeFile(this.path, JSON.stringify(productsParsed))
        }
        return { status: 200, response: 'eliminado' }
        
      } catch (error) {
        console.log(error)
        return { status: 400, response: 'error' }
      }
  
    
    
    }
};



let manager = new ProductManager ();

module.exports = manager
    
