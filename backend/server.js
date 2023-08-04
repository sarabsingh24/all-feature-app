//https://www.youtube.com/watch?v=K8YELRmUb5o ......import
// Run with {npm install dependency} and write {npm init -y to} "type":"module" (package.json file)  so that import is used
// import express from 'express';
// import dotenv from 'dotenv';

//https://www.youtube.com/watch?v=-0exw-9YJBo&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm&index=1 ...require

import express  from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path, { dirname } from 'path';
import chalk from 'chalk';
import {fileURLToPath} from 'url';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
// import { register } from './controllers/authController.js';

/* ==== configration ========== */

dotenv.config();
const port = process.env.PORT || 5002;

connectDB();

const app = express(); 
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan('common'))
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors())
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/assets', express.static(path.join(__dirname,'public/assets')))

/*  File Storage */
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'public/assets')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload = multer({ storage });
 
/* ROUTES */

// app.post('/api/register', upload.single("picture"), register);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); 
  
app.listen(port, () =>
  console.log(chalk.blue`server started at *********** ${port} ***********`)
);
