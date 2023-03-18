import express  from 'express';
import cartsRouters from './src/routes/cart.routes.js'
import productsRoutes from './src/routes/products.routes.js'
import __dirname from './utils.js';



const app = express ()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//app.use(express.static(__dirname + '/src/public/img'))


app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRouters)

const PORT = 8080


app.listen(PORT, () => {
    console.log(`server run on port: ${PORT}`);
})


