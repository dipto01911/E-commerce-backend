const { DecodeToken } = require("../utility/Token")

 const AuthVerify=async(req,res,next)=>{
    let token=req.headers['token']
    if(!token){
        token=req.cookies['token']
    }
    let decoded=await DecodeToken(token);
    if(decoded === null){
        return res.status(401).json({message:'Unauthorized'})
    }
    else{
        let email=decoded['email']
        let user_id=decoded['user_id']
        req.headers.email=email;
        req.headers.user_id=user_id;
        next();

    }

 }

 module.exports={AuthVerify}