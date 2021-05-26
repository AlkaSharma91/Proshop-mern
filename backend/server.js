import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbconfig.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js'
import { errorHandler, notFound } from './middelware/errorMiddelware.js';
dotenv.config()
const app=express()

const Port=process.env.Port || 5000;
connectDB();

app.use("/api/products",productRoutes)

app.use(notFound);
app.use(errorHandler);


app.listen(Port,console.log(`server is running  in ${process.env.NODE_ENV}at port ${Port}`))