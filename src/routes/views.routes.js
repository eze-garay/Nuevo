
import express from 'express'
import manager from '../service/productManager.js'

const router = express.Router()



router.get('/', (req, res)=>{
    try {
        let response =  manager.products.map(products=> products.title)
        if (!response) {
            return res.status(404).send('error')
        }
        return res.status(200).render('home', {
            manager: response
        })
    } catch(error) {
        return res.status(500).send(error)
    }
})


// router.get("/message", (req, res)=>{
//     res.render("messages");
// });


export default router;