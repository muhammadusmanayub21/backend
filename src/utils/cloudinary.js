import { v2 as cloudinary } from 'cloudinary';
import { response } from 'express';
import fs, { unlink } from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadToCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
       const  response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
        })
        console.log("file is uploaded cloudinary successfully", response.url);
        return response;
    }
catch (error) {
    fs.unlinkSync(localFilePath); // remove the localy saved temp file as the upload failed
    return null;
}
}

export  {uploadToCloudinary} //uploadToCloudinary