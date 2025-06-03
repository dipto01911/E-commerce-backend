

const { CartModel } = require("../model/CartListModel");

const mongoose=require('mongoose')
const objectID=mongoose.Types.ObjectId;

const SaveCartService=async(req)=>{
 try{

    let user_id=req.headers['user_id']
    let reqBody=req.body;
    let data =await CartModel.create({userID:user_id,...reqBody})
    return{status:true,message:'product Add to cart',data:data}

 }catch(err){
    return{status:false,message:'error occured',err}
 }
}

const UpdateCartService=async(req)=>{
  try{
  let user_id=req.headers['user_id']
  let CartID=req.params.CartId;
  let reqBody=req.body;
  let query={userID:user_id,_id:CartID}
  let data=await CartModel.updateOne(query,reqBody)
  return{status:true,message:'Updated Successfully'}
  }catch(err){
    return{status:false,message:'error occured',data:err.toString()}
  }
}

const RemoveCartService=async(req)=>{
 try{
  let user_id=req.headers['user_id']
  let {CartId}=req.body;
  let query={_id:CartId,userID:user_id}
   await CartModel.deleteOne(query)
   return{status:true,message:'Cart deleted Successfully'}
 }catch(err){
    return{status:false,message:'error occured',data:err.toString()}
 }
}

const ReadCartListService=async(req)=>{
  try{

 let user_id=new objectID(req.headers['user_id'])
 let matchStage={$match:{userID:user_id}}
 let JoinwithProduct={$lookup:{from:'products',localField:'productID',foreignField:'_id',as:'product'}}
 let JoinWithbrand={$lookup:{from:'brands',localField:'product.brandID',foreignField:'_id',as:'Brand'}}
 let JoinwithCat={$lookup:{from:'categories',localField:'product.categoryID',foreignField:'_id',as:'Cat'}}
 let unwind1={$unwind:'$product'}
 let unwind2={$unwind:'$Brand'}
 let unwind3={$unwind:'$Cat'}
 
 let projectionStage={$project:{
           ' _id':0,
           'createdAt':0,
           'updatedAt':0,
           'product._id':0,
           'product.categoryID':0,
           'product.brandID':0,
           'product.createdAt':0,
           'product.updatedAt':0,
           'Brand._id':0,
           'Brand.createdAt':0,
           'Brand.updatedAt':0,
           'Cat._id':0,
            'Cat.createdAt':0,
            'Cat.updatedAt':0,
 }}
 let data = await CartModel.aggregate([matchStage,JoinwithProduct,JoinWithbrand,
    JoinwithCat,unwind1,unwind2,unwind3,projectionStage])
 return {status:true,message:'Cart details for Particular user',data:data}

}catch(err){
    return{status:false,message:'error occured',data:err.toString()}
  }
}

module.exports={SaveCartService,UpdateCartService,
    RemoveCartService,ReadCartListService}