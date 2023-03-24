
import express from 'express'
import manager from '../service/productManager.js'

const router = express.Router()



router.get('/', async(req, res, next) => {
    let limit = req.query?.limit
    try {
        let response = await manager.getProduct(limit)
        if (!response) {
            return res.status(404).render('error',{
                message: 'no products yet'
            })
        }
        return res.status(200).render('home', {
            title: "list of products",
            nav: [
                { url: "/form", title: "form" },
                { url: "/chat", title: "chat" }
            ],
            manager: response
        })
    } catch(error) {
        return res.status(500).render('error',{
            message: error.message
        })
    }
})


// router.get("/message", (req, res)=>{
//     res.render("messages");
// });


export default router;