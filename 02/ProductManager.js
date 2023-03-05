
const fs = require ("fs");


class ProductManager {
    

   
    constructor() {
        this.product = [];
        this.productDir = "./files";
        this.path = this.productDir + "/Products.json"; 
      
                
    
    }
    
    addProduct = async (title, description, price, thumbnail, code, stock, id) => {
        

        let Product = {

            title : title,
        
            description : description,
        
            price : price,
        
            thumbnail : thumbnail,
        
            code : code,
        
            id : id,
        
            stock : stock,
        }
        
      try {
        await fs.promises.mkdir(this.productDir,{recursive: true})
        
        if (!fs.existsSync(this.path)) {
            await fs.promises.writeFile(this.path, "[]");
        }
        let ProductFile = await fs.promises.readFile(this.path, "utf-8");
        console.info("Archivo JSON obtenido");
        console.log(ProductFile);
        this.product =JSON.parse(ProductFile);

        for (const element of this.product) {
          if (element.code === Product.code) {
              return 'El elemento ya esta cargado' 
        } else if (Product.title === '' || Product.description === '' || Product.price === '' || Product.thumbnail === ''|| Product.id === 0 || Product.stock < 0) {
              return 'Todos los campos son necesarios'
        }}
        Product.id = this.product.length + 1
        console.log("Porductos cargados");
        console.log(this.product);
        this.product.push(Product);
        console.log("Nueva lista de productos cargados");
        console.log(this.product);
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
      this.product = JSON.parse(ProductFile);
      console.log("Productos encontrados: ");
      console.log(this.product);
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

    updateProduc = async (id,title, description, price, thumbnail, code, stock,) =>{
      let Product = {

        title : title,
    
        description : description,
    
        price : price,
    
        thumbnail : thumbnail,
    
        code : code,
    
        id : id,
    
        stock : stock,
    }

    try {
          await fs.promises.mkdir(this.productDir,{recursive: true})
          if (!fs.existsSync(this.path)) {
            await fs.promises.writeFile(this.path, "[]");
          }
          let ProductFile = await fs.promises.readFile(this.path, "utf-8");
          console.info("Archivo JSON obtenido");
          console.log(ProductFile);
          this.product =JSON.parse(ProductFile);
          for (const element of this.product) {
            if (element.id === Product.id) {
                Product.title = title
                Product.description = description
                Product.price = price
                Product.thumbnail = thumbnail
                Product.code = code
                Product.stock = stock
          } else {
            return console.log('No existe el producto para modificar');
          }
         }
      
        console.log("Producto modificado");
        await fs.promises.writeFile(this.path, JSON.stringify(Product));      
    } catch (error) {
          console.error(`No se puede modificar el producto, verifique ${this.productDir}, detalle del error ${error}`);
          throw Error (`No se puede modificar el producto, verifique  ${this.productDir}, detalle del error ${error}`);
          
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
    
      
      }
    
    
};
module.exports = ProductManager;
    
