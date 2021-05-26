import express from 'express';
import Product from '../models/productModel.js';

const router=express.Router();

router.get('/',async(req,res)=>{
    try {
        const products=await Product.find({});
        res.json(products);
        
    } catch (error) {
        res.status(404).json(error);
        
    }
    
})
router.get('/:id',async(req,res)=>{
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
    
})

export default router;