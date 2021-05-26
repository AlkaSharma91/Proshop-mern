import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';

import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/userModel.js';
import connectDB from "./config/dbconfig.js";

dotenv.config();
connectDB()
//function to import data to database

const importData=async()=>{
    try {
        //deleting all data before adding new data
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        //adding users to db     
       const createdUsers= await User.insertMany(users);
        
        const adminUser=createdUsers[0]._id;
        const sampleProducts=products.map((product)=>{
            return {...product,user:adminUser}

        })
        await Product.insertMany(sampleProducts)
        console.log("Data imported".green.inverse)
       
        process.exit();
    } catch (error) {
        console.log(`Error:${error.message}`.red.inverse);
        process.exit(1);
        
    }
};
//function to delete all data from db
const destroyData=async()=>{
    try {
        //deleting all data before adding new data
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        //adding users to db     
       
        console.log("Data Destroyed...".red.inverse)
       
        process.exit();
    } catch (error) {
        console.log(`Error:${error.message}`.red.bold);
        process.exit(1);
        
    }
};
if(process.argv[2]==='-d'){
    destroyData();
}else{
    importData();
}