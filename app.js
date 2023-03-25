import express  from 'express';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';

import viewsRouters from './src/routes/views.routes.js'
import cartsRouters from './src/routes/cart.routes.js'
import productsRoutes from './src/routes/products.routes.js'
import __dirname from './src/utils.js';




const app = express ()
const PORT = 8080



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));


app.engine('handlebars',handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine','handlebars');




app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRouters)
app.use('/', viewsRouters)


const httpServer = app.listen(PORT, () => {
    console.log(`server run on port: ${PORT}`);
})

const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    console.log('cliente conectado')
    socket.on('mensaje', data =>{
        console.log(data)
    })

});



