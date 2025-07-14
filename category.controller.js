const Category=require('../models/category.model')

const getAllCategories=async(req,res)=>{
    try {
        const categories=await Category.find({isDeleted:false})
        res.status(200).json(categories)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


const createCategory=async(req,res)=>{
    try {
        const {name} = req.body
        if(!name){
            return res.status(400).json({message:'Name is required'})
        }

        const category = await Category.create({name})
        res.status(201).json(category)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


const updateCategory=async(req,res)=>{
    try {
        const {name}=req.body
        const category=await Category.findById(req.params.id)

        if (!category) {
             return res.status(404).json({ message: 'Category not found' });
          }

        category.name=name||category.name
        const updateCate=await category.save()
        res.status(200).json(updateCate)  
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteCategory=async(req,res)=>{

    try {
        const category=await Category.findById(req.params.id)

        if(!category) return res.status(404).json({ message: 'category not found' })

        category.isDeleted=true
        await category.save()    
        res.status(200).json({ message: 'category soft deleted successfully' });    
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
module.exports={
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
}