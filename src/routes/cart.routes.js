import { Router } from "express";
const router = Router();
import cart from '../service/carritoManager.js'



router.post('/', async (req,res)=> {
    
    try {
        let prod = await cart.addCart()
        if (prod) {
            return res.json({
                message: 'Carrito creado con éxito',
              });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
})

router.get('/:cid', async (req,res)=>{
    let pid = req.params.cid
    
    try {
        let one = await cart.getCartById(Number(pid))
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

router.post('/:cid/product/:pid', async (req,res)=>{
    const id = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    try {
        let prod = await cart.addProductToCart((id,productId))
        if (prod) {
            return res.json({
                message: 'Carrito creado con éxito',
              });
        } 
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
})





export default router