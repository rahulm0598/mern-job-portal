  import express from 'express';
  import cors from 'cors';
  import cookieParser from 'cookie-parser'; // ✅ Import this
  import dotenv from 'dotenv';
  import { connectDB } from './config/dbconnection.js';
  import userRoutes from './routes/user.routes.js';
  import companyRoutes from './routes/company.routes.js';
  import jobRoutes  from  './routes/job.routes.js';
  import applicationRoutes from './routes/application.routes.js';
  import { v2 as cloudinary } from 'cloudinary';


  dotenv.config();

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ✅ Use cookie-parser BEFORE routes
  app.use(cookieParser()); 

  // ✅ CORS with credentials
  app.use(cors({
    origin: 'http://localhost:5173', // frontend port
    credentials: true                // allows cookies (important for JWT in cookies)
  }));



  const PORT = process.env.PORT || 5000;

  // ✅ Use routes AFTER middleware
  app.use("/api/user", userRoutes);
  app.use("/api/company",companyRoutes);
  app.use("/api/job",jobRoutes);
  app.use("/api/application",applicationRoutes)


  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  
  app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
  });
