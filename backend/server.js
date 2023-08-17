//https://www.youtube.com/watch?v=K8YELRmUb5o ......import
// Run with {npm install dependency} and write {npm init -y to} "type":"module" (package.json file)  so that import is used
// import express from 'express';
// import dotenv from 'dotenv';

//https://www.youtube.com/watch?v=-0exw-9YJBo&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm&index=1 ...require

//https://www.udemy.com/course/mern-stack-front-to-back/learn/lecture/10055158#overview

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';

import helmet from 'helmet';
import morgan from 'morgan';
import path, { dirname } from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

//Routes

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import { errorHandeler } from './middleware/errorMiddleware.js';
import { register, userImg } from './controllers/authController.js';

// import { register } from './controllers/authController.js';

/* ==== configration ========== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'upload/assets')));

/*  File Storage */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/assets');
  },
  filename: function (req, file, cb) {
    const name = file.originalname;
    const ind = name.indexOf('.');
    const newName = name.slice(0, ind);
    cb(null, newName + '_' + Date.now() + path.extname(file.originalname));
  },
  limits: {
    fileSize: 1000,
  },
});

const upload = multer({ storage }).single('picUrl');
app.post('/api/auth/userImg', upload, userImg);

/* ROUTES */

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

app.use(errorHandeler);
const port = process.env.PORT || 5002;
app.listen(port, () =>
  console.log(chalk.blue`server started at *********** ${port} ***********`)
);
