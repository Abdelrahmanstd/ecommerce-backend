const Brand=require('../models/brand.model')


exports.getAllBrands=async (req,res)=>{
    try {
        const brands =await Brand.find({isDeleted:false})
        res.status(200).json(brands)
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}


exports.createBrand=async(req,res)=>{
    try {
        const {name,description}=req.body
        const image = req.file ? req.file.path : null;
        if(!name || !image || !description){
            return res.status(400).json({message:'All fields are required '})
        }

        const brand = await Brand.create({
            name,
            image,
            description
        })

        res.status(201).json(brand)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateBrand=async(req,res)=>{
    try {
        const brand=await Brand.findById(req.params.id)

        if(!brand){
            return res.status(404).json({message:'Brand not found' })
        }

        const {name,description}=req.body
        const image = req.file ? req.file.path : null;
        brand.name=name || brand.name
        brand.image=image || brand.image
        brand.description=description || brand.description

        const updateBrand =await  brand.save()
        res.status(200).json(updateBrand)

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteBrand=async (req,res)=>{
    try {
        const brand=await Brand.findById(req.params.id)

        if(!brand) return res.status(404).json({ message: 'Brand not found' })
        
        brand.isDeleted=true
        await brand.save()
        res.status(200).json({ message: 'Brand soft deleted successfully' });    
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}



// exports.restoreBrand = async (req, res) => {
//   try {
//     const brand = await Brand.findById(req.params.id);
//     if (!brand) return res.status(404).json({ message: 'Not found' });

//     brand.isDeleted = false;
//    await brand.save();
//    res.status(200).json({ message: 'Brand restored successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }
