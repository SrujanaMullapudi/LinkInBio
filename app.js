import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';


const app = express();
const PORT = process.env.PORT || 3000;
const URI = `mongodb+srv://virtualLab:${process.env.DB_PASSWORD}@cluster0.e6bxe.mongodb.net/?retryWrites=true&w=majority`;
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));


mongoose
        .connect(URI, { useNewUrlParser: true })
        .then(()=>{
            console.log("database connected");
        })
        .catch(err =>{
            console.log(err);
        })
app.listen(PORT , ()=>{
    if(process.env.NODE_ENV == 'production'){

    }else{
        console.log(`server running at: ${PORT}`);
    }
})

