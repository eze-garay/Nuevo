import  express  from "express";
import ProductManager from "./ProductManager";

const app = express ();
const PORT =  800;

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
})