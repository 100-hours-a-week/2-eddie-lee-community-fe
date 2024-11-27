import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './src/routes/userRoutes.js';
import postRouter from './src/routes/postRoutes.js';
import authRouter from './src/routes/authRoutes.js';
//import dataRouter from './src/routes/dataRoutes.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();
const port = 4444;
const router = express.Router();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(router);
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/auth', authRouter);
//router.use('/data', dataRouter);

app.get('/', (req, res) => {
    res.redirect(301, '/auth/login');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
