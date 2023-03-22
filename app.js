import express  from 'express';
import handlebars from 'express-handlebars';
//import {server} from 'socket.io';
import cartsRouters from './src/routes/cart.routes.js'
import productsRoutes from './src/routes/products.routes.js'
import __dirname from './utils.js';



const app = express ()

//const socketServer = new server

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars',handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine','handlebars');

app.use(express.static(__dirname + '/public'));


app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRouters)

const PORT = 8080


app.listen(PORT, () => {
    console.log(`server run on port: ${PORT}`);
})


