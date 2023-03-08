
const fs = require ("fs");


class ProductManager {
    
  
   
    constructor() {
        this.product = [];
        this.productDir = "./files";
        this.path = this.productDir + "/Products.json"; 
      
                
    
    }
    
    addProduct = async (title, description, price, thumbnail, code, stock, id) => {
        

        let Product = {

            title,
        
            description,
        
            price,
        
            thumbnail,
        
            code,
        
            id,
        
            stock,
        }
        
      try {
        await fs.promises.mkdir(this.productDir,{recursive: true})
        
        if (!fs.existsSync(this.path)) {
            await fs.promises.writeFile(this.path, "[]");
        }
        let ProductFile = await fs.promises.readFile(this.path, "utf-8");
        console.info("Archivo JSON obtenido");
        console.log(ProductFile);
        const productsParsed=JSON.parse(ProductFile);
        Product.id = this.product.length + 1

        if (this.product.find((prod) => prod.code == code)) {
              console.log('El elemento ya esta cargado')
        } else if (Product.title === '' || Product.description === '' || Product.price === '' || Product.thumbnail === ''|| Product.id === 0 || Product.stock < 0) {
              console.log('Todos los campos son necesarios')
        }
      
        console.log("Porductos cargados");
        console.log(productsParsed);
        this.product.push(Product);
        console.log("Nueva lista de productos cargados");
        console.log(productsParsed);
        await fs.promises.writeFile(this.path, JSON.stringify(this.product));
      } catch (error) {
        console.error(`Error cargando producto nuevo: ${JSON.stringify(Product)}, detalle del error :${error}`);
        throw Error (`Error cargando producto nuevo: ${JSON.stringify(Product)}, detalle del error :${error}`);
        
      }
    }

    getProduct = async () =>{
      try {
        await fs.promises.mkdir(this.productDir,{recursive: true})
        if (!fs.existsSync(this.path)) {
          await fs.promises.writeFile(this.path, "[]");
      }

      let ProductFile = await fs.promises.readFile(this.path, "utf-8");
      console.info("Archivo JSON obtenido desde archivo: ");
      console.log(ProductFile);
      const productsParsed=JSON.parse(ProductFile);
      console.log("Productos encontrados: ");
      console.log(productsParsed);
      return this.product;
      } catch (error) {
        console.error(`Error al consultar la lista de productos, verifique el archivo ${this.productDir}, detalle del error ${error}`);
        throw Error (`Error al consultar la lista de productos, verifique el archivo ${this.productDir}, detalle del error ${error}`);
      }
    }

    getProductById = async (id) =>{
      try {
        await fs.promises.mkdir(this.productDir,{recursive: true})
        if (!fs.existsSync(this.path)) {
          await fs.promises.writeFile(this.path, "[]");
        }
      let ProductFile = await fs.promises.readFile(this.path, "utf-8");
      console.info("Archivo JSON obtenido desde archivo: ")
      console.log(ProductFile) 
      this.product = JSON.parse(ProductFile);
      for(const element of this.product) {
      if (element.id === id) {
        return console.log(element.title);
      } else {
        return console.log('El producto no esta en la lista');
      }}
  } catch (error) {
    console.error(`No se puede encontrar el producto, verifique ${this.productDir}, detalle del error ${error}`);
    throw Error (`No se puede encontrar el producto, verifique  ${this.productDir}, detalle del error ${error}`);
    }
    }


    updateProductById = async (id, updatedData) => {
      let result = await fs.promises.readFile(this.path)
      let parsedRes = await JSON.parse(result)
      
      let productToUpdate = parsedRes.find(product => product.id == id)
      
      if (productToUpdate) {
      // actualizar el objeto
      Object.assign(productToUpdate, updatedData)
      
      await fs.promises.writeFile(this.path, JSON.stringify(parsedRes))
      
      console.log('producto correctamente modificado')
      } else {
      console.log(`El producto de ID ${id} no existe`)
      }
      }
 
    deleteProduct = async (id) => {
  
      const ProductFile = await fs.promises.readFile(this.path, "utf-8")
      const productsParsed = JSON.parse(ProductFile);
      const productFounded = await productsParsed.find(product => product.id === id )

      if (productFounded) {
        console.log(productsParsed.indexOf(productFounded))
        productsParsed.splice(productsParsed.indexOf(productFounded), 1)
        await fs.promises.unlink(this.path)
        await fs.promises.writeFile(this.path, JSON.stringify(productsParsed))
        
      } else {
        console.log(`El producto con el id: ${id}, no esta en la lista de productos`)
      }
    
      console.log(`El producto con el id: ${id},se ha eliminado de la lista de productos`)
      }
    
    
};
exports.ProductManager ();
    
