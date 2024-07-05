import mongoose from "mongoose";
import { DB_Name } from "../constants.js";


const connectDB = async () => {

    try {
        const connectionInstance = await mongoose.connect(`${process.env.MANGODB_URI}/${DB_Name}`)

        console.log(`MongoDB connected!! DB HOST: ${connectionInstance.connection.host}`);
    }

    catch (error) {
        console.log("MOngoDB connection error", error);
        process.exit(1);
    }
};


export default connectDB;