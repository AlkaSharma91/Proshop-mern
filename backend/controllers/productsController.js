import Product from "../models/productModel.js";

//@desc Fetch all products 
//route GET/api/products
// public access
export const getProducts=async(req,res)=>{
    try {
        const products=await Product.find({});
        res.json(products);
        
    } catch (error) {
        res.status(404).json(error);
        
    }
    
}

//@desc Fetch product by id
//route GET/api/products/:id
// public access

export const getProductById=async(req,res)=>{
    try {
        const product= await Product.findById(req.params.id)
        if(product){
            res.json(product);
        }else{
            res.status(404).json({message:"Product not found"})
        }
       
        
    } catch (error) {
        res.status(404).json(error);
        
    }
    
}