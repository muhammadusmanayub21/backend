import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"
import { uploadToCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler ( async (req, res) => {
    // return res.status(200).json({  
    //     message: "chai or code with chai", 
    // });
    //STEPS:
    //=======================//
    //user registeration details from request body
    //validation --not empty 
    //check if user already exist 
    //check for images , check for avatar
    // upload to cloudinary
    // create user object - create entry in db 
    // remove password and refsh token field form response 
    // save to db
    //return success response

    //----------------------------//
    const { userName, email, fullName, password } = req.body
    if ([fullName, userName, email, password].some(field => field?.trim() === "")) {
        throw new ApiError("All fields are required", 400)
    }

    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    })
    
    if (existedUser) {
        throw new ApiError("User already exist", 409)

    }
    // console.log(req.files)

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;


    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0]?.path
    }


    if (!avatarLocalPath) {
        throw new ApiError("Avatar and cover are required", 400)
    }

    const avatar = await uploadToCloudinary(avatarLocalPath)
    const coverImage = await uploadToCloudinary(coverImageLocalPath)

    if (!avatar ) {
        throw new ApiError(400, "Avatar file is required")
    }
   

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName: userName
    })
    const createduser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createduser){
        throw new ApiError("something went wrong in User creation failed", 500)
    }
    
    return res.status(201).json(
        new ApiResponse(200, createduser, "User created successfully")
    )
});

export { registerUser }