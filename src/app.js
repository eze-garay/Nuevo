const express = require ('express')
const app = express ()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('port',8080)
app.listen(
    app.get('port'),
    ()=>(console.log('SERVER PORT:'+app.get('port')))
)
const manager = require('./ProductManager')

app.get('/products', async (req,res)=> {
    let limit = req.query?.limit
    try {
        let prod = await manager.getProduct(limit)
        if (!prod) {
            return res.status(404).send({error: 'no funciona'})
            
        } else {
            return res.status(200).send(prod)
        }
        
    } catch (error) {
        return res.status(500).send(error.message)
    }

})