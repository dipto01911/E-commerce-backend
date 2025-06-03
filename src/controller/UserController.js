
const {UserLoginService, UserVerifyService,
 UserLogoutService, CreateProfileService,
 UpdateProfileService,
 DeleteProfileService,
 ReadProfileService
}=require('../service/UserService')


 
const UserLogin=async(req,res)=>{
 let result=await UserLoginService(req)
   return res.status(200).json({message:'Verfication code ',result})
 }

const UserVerify=async(req,res)=>{
 await UserVerifyService(req,res);

}

const UserLogout=async(req,res)=>{
 await UserLogoutService(req,res);
}

const CreateProfile=async(req,res)=>{
    let result=await CreateProfileService(req)
    return res.status(201).json({message:'Profile Created',result})
}

const UpdateProfile=async(req,res)=>{
    let result=await UpdateProfileService(req)
    return res.status(200).json(result)
}

const ReadProfile=async(req,res)=>{
    let result=await ReadProfileService(req)
    return res.status(200).json(result)
}

const DeleteProfile=async(req,res)=>{
    let result=await DeleteProfileService(req)
    return res.status(200).json(result)
}


 module.exports={UserLogin,UserVerify,UserLogout,
    CreateProfile,UpdateProfile,DeleteProfile,ReadProfile}