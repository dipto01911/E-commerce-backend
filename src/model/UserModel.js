
 
 const mongoose=require('mongoose')
 
 const DataSchema=mongoose.Schema({
  email:{type:String,unique:true,required:true,lowercase:true},
  otp:{type:String,required:true}
 },{
     versionKey:false,
     timestamps:true
 })
 
 const UserModel=mongoose.model('users',DataSchema)
 module.exports={UserModel}