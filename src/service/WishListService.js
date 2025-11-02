const mongoose=require('mongoose')
const { WishListModel } = require("../model/WishListModel");

const objectID=mongoose.Types.ObjectId;

 const SaveWishListService=async(req)=>{
  try{
  let user_id=req.headers['user_id']
  let reqBody=req.body;
  reqBody.userID=user_id;
  await WishListModel.updateOne(reqBody,{$set:reqBody},{upsert:true})
  return{status:true,message:'Product Added into WishList'}
  }catch(err){
    return{status:false,message:'Something went wrong !'}
  }
 }

 const ReadWishListService=async(req,res)=>{
    try{
 
        let user_id= new objectID(req.headers['user_id'])
       
        let matchStage={$match:{userID:user_id}}
        let JoinwithProduct={$lookup:{from:'products',localField:'productID',foreignField:'_id',as:'product'}}
        let JoinwithBrand={$lookup:{from:'brands',localField:'product.brandID',foreignField:'_id',as:'Brand'}}
        let JoinwithCat={$lookup:{from:'categories',localField:'product.categoryID',foreignField:'_id',as:'Category'}}
      //  let JoinwithProfile={$lookup:{from:'profiles',localField:'userID',foreignField:'userID',as:'Profile'}}

        let unwind1={$unwind:'$product'}
        let unwind2={$unwind:'$Brand'}
        let unwind3={$unwind:'$Category'}
        //let unwind4={$unwind:'$Profile'}
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
           'Category._id':0,
            'Category.createdAt':0,
            'Category.updatedAt':0,
            // 'Profile._id':0,
            // 'Profile.userID':0,
            // 'Profile.createdAt':0,
            //  'Profile.updatedAt':0
}}

      let data=await WishListModel.aggregate([matchStage,JoinwithProduct,
      JoinwithBrand,JoinwithCat,unwind1,unwind2,
      unwind3,projectionStage])
         return {status:true,message:'WishList Details Information',data:data}
       
       

    }catch(err){
        return {status:false,data:err}
    }
 }

 const RemoveWishListService=async(req,res)=>{
    try{
      let user_id=req.headers['user_id']
      let reqBody=req.body;
      reqBody.userID=user_id;
      let data=await WishListModel.deleteOne(reqBody)
      return{status:true,message:'Deleted Succesfully'}
    }catch(err){
        return{status:false,message:'Error occured'}
    }
 }
 module.exports={SaveWishListService,ReadWishListService,RemoveWishListService}