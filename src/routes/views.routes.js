
import express from 'express'
import manager from '../service/productManager.js'

const router = express.Router()



router.get('/', async(req, res, next) => {
    let limit = req.query?.limit
    try {
        let response = await manager.getProduct(limit)
        if (!response) {
            return res.status(404).render('error',{
                message: 'no hay profuctos'
            })
        }
        return res.status(200).render('home', {
            title: "lista de productos",
            manager: response
        })
    } catch(error) {
        return res.status(500).render('error',{
            message: error.message
        })
    }
})

router.get('/realtimeproducts', async(req, res, next) => {
    try {
        let response = await manager.getProduct()
        if (!response) {
            return res.status(404).render('error',{
                message: 'no products yet'
            })
        }
        return res.status(200).render('realTimeProducts', {
            title: "Productos en tiempo real",
            manager: response
        })

    } catch(error) {
        return res.status(500).render('error',{
            message: error.message
        })
    }
})

router.post('/new-product', async (req,res)=> {
    let product = req.body
    try {
        let prod = await manager.addProduct((product))
        if (prod) {
            return res.status(200).send(prod)
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
})

router.delete('/:id', async (req,res)=>{
    let id = req.params.id
    try {
        let one = await manager.deleteProduct(Number(id))
        return res.status(one.status).send(one.response)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

// router.get("/message", (req, res)=>{
//     res.render("messages");
// });


export default router;