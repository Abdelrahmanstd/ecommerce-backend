const express=require('express')
const router=express.Router()

const {
     getAllSubCategories,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory
}=require('../controllers/subCategory.controller')
const protect=require('../middleware/authMiddleware')
const admin=require('../middleware/adminMiddleware')


router.get('/',getAllSubCategories)

router.post('/',protect,admin,createSubCategory)

router.put('/:id',protect,admin,updateSubCategory)

router.delete("/:id",protect,admin,deleteSubCategory)

module.exports=router