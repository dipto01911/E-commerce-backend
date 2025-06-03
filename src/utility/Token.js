
const jwt=require('jsonwebtoken')
const { JWT_KEY, JWT_TIME } = require('../../config')

const EncodeToken=async(email,user_id)=>{
     let Payload={email:email,user_id:user_id}
     const EXPIRES={expiresIn:JWT_TIME}
     return jwt.sign(Payload,JWT_KEY,EXPIRES)
}


const DecodeToken=async(token)=>{
  try{
   return jwt.verify(token,JWT_KEY)
  }catch(err){
    return null;
  }
}

module.exports={EncodeToken,DecodeToken}