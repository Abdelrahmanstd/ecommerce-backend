const express=require('express')
const router=express.Router()

const{
    getAllBrands,
    createBrand,
    updateBrand,
    deleteBrand
}=require('../controllers/brand.controller')
const protect=require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')
const upload=require("../config/multer.config")
router.get('/',getAllBrands)

router.post('/', protect, admin, upload.single('image'), createBrand)

router.put('/:id', protect, admin, upload.single('image'), updateBrand);

router.delete("/:id" , protect,admin,deleteBrand)
module.exports=router