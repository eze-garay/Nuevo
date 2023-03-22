import express  from 'express';
import handlebars from 'express-handlebars';
//import {server} from 'socket.io';

import viewsRouters from './src/routes/views.routes.js'
import cartsRouters from './src/routes/cart.routes.js'
import productsRoutes from './src/routes/products.routes.js'
import __dirname from './utils.js';



const app = express ()
const PORT = 8080

//const socketServer = new server

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars',handlebars.engine());
app.set('views', __dirname + "src/views");
app.set('view engine','handlebars');


app.use(express.static(__dirname + 'src/public'));


app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRouters)
app.use('/', viewsRouters)


app.listen(PORT, () => {
    console.log(`server run on port: ${PORT}`);
})


