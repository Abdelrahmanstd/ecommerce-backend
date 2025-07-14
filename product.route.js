const express=require('express')
const router=express.Router()
const upload=require("../config/multer.config")
const{
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById
}=require('../controllers/product.controller')

const protect=require('../middleware/authMiddleware')
const admin=require('../middleware/adminMiddleware')


router.get('/',getAllProducts)
router.get('/:id', getProductById);
router.post('/',protect,upload.single('image'),admin,createProduct)

router.put('/:id',protect,upload.single('image'),admin,updateProduct)

router.delete("/:id",protect,admin,deleteProduct)

module.exports=router