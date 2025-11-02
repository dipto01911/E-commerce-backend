


 
 const mongoose=require('mongoose')
 
 const DataSchema=mongoose.Schema({
  
     userID:{type:mongoose.Schema.Types.ObjectId,required:true},
     productID:{type:mongoose.Schema.Types.ObjectId,required:true},
     des:{type:String,required:true},
     rating:{type:String},
   
 },{
     versionKey:false,
     timestamps:true
 })
 
 const ReviewModel=mongoose.model('reviews',DataSchema)
 module.exports={ReviewModel}