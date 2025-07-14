const Product=require('../models/product.model')


exports.getAllProducts=async (req,res)=>{
    try {
        const products=await Product.find({isDeleted:false})
        .populate('brand')
        .populate('category')
        .populate('subCategory')
         res.status(200).json(products)
        
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}

exports.getProductById =async(req,res)=>{
    try {
    const product = await Product.findById(req.params.id).populate('brand category subCategory');
    
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.createProduct=async(req,res)=>{
    try {
        const {name,description,price,brand , category , subCategory}=req.body

        const image = req.file ? req.file.path : null;
        if(!name || !description ||!price||!image ||!brand || !category || !subCategory){
            return res.status(400).json({message:'all fields are required'})
        }

        const product=await Product.create({
            name,
            description,
            price,
            image,
            brand,
            category,
            subCategory
        })

        res.status(200).json(product)

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateProduct=async(req,res)=>{
    try {
        const {name,description,price,brand,category,subCategory}=req.body

        const product=await Product.findById(req.params.id)

        if (!product) {
         return res.status(404).json({ message: 'Product not found' });
      }

    const image = req.file ? req.file.path : null;  
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.subCategory = subCategory || product.subCategory;

    const updateProduct=await product.save()
    res.status(200).json(updateProduct)    
    
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteProduct=async(req,res)=>{
    try {
        const product =await Product.findById(req.params.id)
        if(!product) return  res.status(404).json({ message: 'product not found' }) 
        
        product.isDeleted=true
        await product.save()    
        res.status(200).json({ message: 'Product soft deleted successfully' });    
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}