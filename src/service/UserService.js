const { ProfileModel } = require("../model/ProfileModel");
const { UserModel } = require("../model/UserModel");
const { EmailSend } = require("../utility/Email");
const { EncodeToken } = require("../utility/Token");


 const UserLoginService=async(req)=>{

     try{
   const email=req.params.email;
const otp=Math.floor(100000+Math.random()*900000)
let EmailText=`Verification code is ${otp}`;
let EmailSubject='Email Verification'
await EmailSend(email,EmailText,EmailSubject)
 await UserModel.updateOne({email:email},{$set:{otp:otp}},{upsert:true})
 return{status:true,data:otp}

     }catch(err){
        return{status:false,data:err}
     }

 }

 const UserVerifyService=async(req,res)=>{
   try{
     let email=req.params.email;
     let otp=req.params.otp;
     let total=await UserModel.find({email:email,otp:otp})
     if(total.length>0){
   //if user are found then generate token using email and user_id by EncodeToken function
   let user_id=total[0]['_id'].toString();

   let token= await EncodeToken(email,user_id)
   //After generate token set otp 0 in the UserModel

   await UserModel.updateOne({email:email},{$set:{otp:"0"}})

    //res.status(200).json({message:'User Verify Successfully','Token':token})
   
  // Now set the token to the cookies



  const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: false,
    };

//another method to set cookies
//    let option = {
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//         httpOnly: true,
//         sameSite: "none",
//         secure: true,
//      };
 //res.cookie("Token", token, option);

   res.cookie('token',token,cookieOptions);

   res.status(200).json({message:'Verify Sucess',token})

    }else{
    res.status(401).json({message:'User not Verify'})
     }
   }catch(err){
    res.status(500).json({message:'Server error',err})
   }
 }

const UserLogoutService=async(req,res)=>{
  const cookieOptions = {
      expires: new Date(Date.now() - 24 * 60 * 60 * 1000),
      httpOnly: false,
    };
    res.cookie('token'," ",cookieOptions)
    res.status(200).json({message:'User Logout Success'})
}


const CreateProfileService=async(req)=>{
 try{
 let user_id=req.headers['user_id']
 const reqBody=req.body;
 let data= await ProfileModel.create({userID:user_id,...reqBody})
 return{status:true,data:data}

 }catch(err){
    return{status:false,data:err}
 }
}

const UpdateProfileService=async(req)=>{
try{
  let user_id=req.headers['user_id']
  let query={userID:user_id}
  let reqBody=req.body;
  let data=await ProfileModel.updateOne(query,reqBody)
  return{status:true,data:data}

}catch(err){
    return{status:false,data:err}
}
}

const ReadProfileService=async(req)=>{
    try{
    let user_id=req.headers['user_id']
   let query={userID:user_id}
   let data= await ProfileModel.find(query)
    return {status:true,data:data}
   
    }catch(err){
        return{status:false,data:err}
    }
}

const DeleteProfileService=async(req)=>{
    try{
 let user_id=req.headers['user_id']
 let query={userID:user_id}
 let data=await ProfileModel.deleteOne(query)
 return {status:true,data:data}
    }catch(err){
        return{status:false,data:err}
    }
}

 module.exports={UserLoginService,UserVerifyService,
    UserLogoutService,CreateProfileService,
    UpdateProfileService,DeleteProfileService,ReadProfileService}