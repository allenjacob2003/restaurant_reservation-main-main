import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from "./config/mongodb.js"
import connenctCloudinary from './config/cloudinary.js';
import userRouter from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import reservationRoute from "./routes/reservationRoute.js";
import cookieParser from 'cookie-parser';
dotenv.config()
 

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 4000;

connectDB()
connenctCloudinary()

app.use(cors({
  origin: ['http://localhost:5174','http://localhost:5173'], // frontend URL
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())
app.use('/menu_images',express.static(path.join(__dirname,'menu_images/')))

app.use('/api/user',userRouter)
app.use('/api/product',productRoute)
app.use('/api/reservations', reservationRoute)


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT,()=> console.log('server is running on port' + PORT));
