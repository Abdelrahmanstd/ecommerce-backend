const SubCategory=require('../models/subCategory.model')

const getAllSubCategories=async(req,res)=>{
    try {
        const subCategories = await SubCategory.find({isDeleted:false}).populate('category');
        res.status(200).json(subCategories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


const createSubCategory=async(req,res)=>{
    try {
        const {name,category}=req.body
        if(!name || !category){
            res.status(404).json({ message: 'Name and category are required' })
        }
        const subCategory=await SubCategory.create({name,category})
        res.status(201).json(subCategory)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


const updateSubCategory=async(req,res)=>{
    try {
        const { name, category } = req.body;

    const subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }

    subCategory.name = name || subCategory.name;
    subCategory.category = category || subCategory.category;

    const updated = await subCategory.save();
    res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteSubCategory=async(req,res)=>{
    try {
     const subCategory=await SubCategory.findById(req.params.id)
     if(!subCategory) return res.status(404).json({ message: 'category not found' })
     
     subCategory.isDeleted=true
     await subCategory.save()   
     res.status(200).json({ message: 'category soft deleted successfully' });  
    } catch (err) {
         res.status(500).json({ message: err.message });
    }
}
module.exports={
    getAllSubCategories,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory
}