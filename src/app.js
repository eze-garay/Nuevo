const express = require ('express')
const app = express ()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('port',8080)
app.listen(
    app.get('port'),
    () => {console.log('SERVER PORT:'+app.get('port'))}
)
const manager = require('./ProductManager')

app.get('/products', async (req,res)=> {
    let limit = req.query?.limit
    try {
        let prod = await manager.getProduct(limit)
        if (!prod) {
            return res.status(404).send({error: 'no funciona'})
            
        }  if (limit) {
            const limitacion = prod.splice(0,limit);
            return res.status(200).send(limitacion)
        } else {
          return res.status(200).send(prod)
        }

        
    } catch (error) {
        return res.status(500).send(error.message)
    }

})


app.get('/product/:pid', async (req,res)=>{
    let pid = req.params.pid
    
    try {
        let one = await manager.getProductById(Number(pid))
        //const found = await manager.product.filter(e => e.id === pid)
        
        if (one) {

            //return res.status(200).send(found)
            return res.status(200).send(one)

        } else {
            return res.status(404).send({error: 'Producto no econtrado'})
        }
        
    } catch (error) {
        return res.status(500).send(error.message)
    }
} )

app.post('/products', async (req,res)=> {
    let product= req.body
    try {
        let prod = await manager.addProduct((product))
        if (prod) {
            return res.status(200).send(prod)
        }

    } catch (error) {
        return res.status(500).send(error.message)
    }
})

app.delete('/product/:id', async (req,res)=>{
    let id = req.params.id
    try {
        let one = await manager.deleteProduct(Number(id))
        if (one) {
            return res.status(200).send(one)
        } else {
            return res.status(500).send({ status: "error", error: "El producto no se pudo borrar." })
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
})
app.put('/product/:pid', async (req,res)=> {
    let pid = req.params.pid
    
    try {
        let productUpdated =  await manager.updateProductById(Number(pid),req.body)
        if (productUpdated) {
            return res.status(200).send({message: "Producto Modificado"})
        } else {
            return res.status(500).send({error: "El producto no se pudo modificar"})
        }    
    } catch (error) {
        return res.status(500).send(error.message)
    }

})