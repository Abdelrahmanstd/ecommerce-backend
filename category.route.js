const express=require('express')
const router=express.Router()

const{
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
}=require('../controllers/category.controller')

const protect=require('../middleware/authMiddleware')
const admin=require('../middleware/adminMiddleware')


router.get("/",getAllCategories)

router.post('/',protect,admin,createCategory)

router.put("/:id",protect,admin,updateCategory)

router.delete("/:id",protect,admin,deleteCategory)

module.exports=router