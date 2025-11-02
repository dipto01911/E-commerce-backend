const { BrandModel } = require("../model/BrandModel")
const { CategoryModel } = require("../model/CategoryModel")
const { ProductModel } = require("../model/ProductModel")
const { ProductSliderModel } = require("../model/ProductSliderModel")
const mongoose=require('mongoose')
const { ReviewModel } = require("../model/ReviewModel")

const objectID=mongoose.Types.ObjectId;
 
  const ReadBrandListService=async(req,res)=>{
    try{
       let data=await BrandModel.find()
        res.status(200).json({message:'Brands are',data})

    }catch(err){
    res.status(500).json({message:'Server error'})
    }
  }

  const ReadCategoryListService=async(req,res)=>{
    try{

        let data=await CategoryModel.find()
      res.status(200).json({message:'All Category are ',data})
        }catch(err){
        res.status(500).json({message:'Server error'})
    }
  }

  const ReadSliderListService=async(req,res)=>{
   try{
   let data=await ProductSliderModel.find()
  // const data=await ProductSliderModel.aggregate([])
    res.status(200).json({message:'Product SliderList ',data})
   }catch(err){
    res.status(500).json({message:'Server error ',error: err.toString()})
   }
  } 

  const ProductListByBrandService=async(req)=>{
     
    try{

     const brandId= new objectID(req.params.BrandID);
     const matchStage={$match:{brandID:brandId}}
     const JoinwithBrandStage={$lookup:{from:'brands',localField:'brandID',foreignField:'_id',as:'BrandList'}}
      const WindingStage={$unwind:'$BrandList'}
      const projection={$project:{
        'createdAt':0,
        'updatedAt':0,
        'BrandList._id':0,
        'BrandList.createdAt':0,
        'BrandList.updatedAt':0

      }}
     let data=await ProductModel.aggregate([matchStage,JoinwithBrandStage,WindingStage,projection])
   
   return {status:true, data:data}
    }catch(err){
        return {status:false ,data:err}
    }
  }

  const ProductListByCatService=async(req,res)=>{
     try{
    let CatID=new objectID(req.params.CategoryID)
    let matchStage={$match:{categoryID:CatID}}
    let JoinwithCat={$lookup:{from:'categories',localField:'categoryID',foreignField:'_id',as:'CategoriesList'}}
    let WindingStage={$unwind:'$CategoriesList'}  

    let JoinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:'brandDetials'}}

    let projection={$project:{
        'createdAt':0,
        'updatedAt':0,
        'CategoriesList._id':0,
        'CategoriesList.createdAt':0,
        'CategoriesList.updatedAt':0
    }}  

    let data=await ProductModel.aggregate([matchStage,JoinwithCat,WindingStage,projection,JoinWithBrandStage])
    return {status:true, data:data}
}catch(err){
        return {status:false,data:err}
     }
  }

const ProductWithBrand_CatService=async(req)=>{
   try{
   const productId=new objectID(req.params.productID)

  let matchStage={$match:{_id:productId}}
  let JoinWithbrand={$lookup:{from:'brands',localField:'brandID',foreignField:'_id',as:'Brand'}}
  let JoinWithCat={$lookup:{from:'categories',localField:'categoryID',foreignField:'_id',as:'Catagories'}}

 let winding1={$unwind:'$Brand'}
 let winding2={$unwind:'$Catagories'}
  
  let BrandProjection={$project:{
        'createdAt':0,
        'updatedAt':0,
        'Brand._id':0,
        'Brand.createdAt':0,
        'Brand.updatedAt':0
    }} 

    let CatProjection={$project:{
        'Catagories._id':0,
        'Catagories.createdAt':0,
        'Catagories.updatedAt':0
    }}
  
  let data=await ProductModel.aggregate([matchStage,JoinWithCat,JoinWithbrand,winding1,winding2,BrandProjection,CatProjection])
  return {status:true, data:data}
   }catch(err){
    return {status:false,data:err}
   }
}


const ProductDetailsService=async(req)=>{
    try{
       let productId=new objectID(req.params.productID)
       let matchStage={$match:{_id:productId}}
       let JoinWithbrand={$lookup:{from:'brands',localField:'brandID',foreignField:'_id', as:'Brand'}}
       let JoinWithCategories={$lookup:{from:'categories',localField:'categoryID',foreignField:'_id',as:'Category'}}
       let JoinWithDetails={$lookup:{from:'productdetails',localField:'_id',foreignField:'productID',as:'Details'}}

     let unwind1={$unwind:'$Brand'}
     let unwind2={$unwind:'$Category'}
     let unwind3={$unwind:'$Details'}

     let brandProjection={$project:{
    
        'createdAt':0,
        'updatedAt':0,
         'Brand._id':0,
        'Brand.createdAt':0,
        'Brand.updatedAt':0


     }}

  let catProjection={$project:{
         'Category._id':0,
        'Category.createdAt':0,
        'Category.updatedAt':0
  }}

let detailsProjection={$project:{
    'Details._id':0,
    'Details.createdAt':0,
    'Details.updatedAt':0,
    
}}

       let data=await ProductModel.aggregate([matchStage,JoinWithbrand,JoinWithCategories,JoinWithDetails,unwind1,unwind2,unwind3,brandProjection,catProjection,detailsProjection])
        return {status:true,data:data}

    }catch(err){
        return {status:false,data:err}
    }
}

const ProductFindByRemarkService=async(req)=>{
 
    try{
let Remark=req.params.remark;
const matchStage={$match:{remark:Remark}}
let JoinBrandStage={$lookup:{from:'brands',localField:'brandID',foreignField:'_id',as:'Brand'}}
let JoinCategoryStage={$lookup:{from:'categories',localField:'categoryID',foreignField:'_id',as:'Categories'}}
let unwind1={$unwind:'$Brand'}
let unwind2={$unwind:'$Categories'}
let BrandProjection={$project:{
    'createdAt':0,
    'updatedAt':0,
    'Brand._id':0,
    'Brand.createdAt':0,
    'Brand.updatedAt':0
}}     

let CategoriesProjection={$project:{
    'Categories._id':0,
    'Categories.createdAt':0,
    'Categories.updatedAt':0
}}

let data=await ProductModel.aggregate([matchStage,JoinBrandStage,JoinCategoryStage,unwind1,unwind2,BrandProjection,CategoriesProjection])

return {status:true,data:data}
    }catch(err){
        return {status:false,data:err}
    }
}

const ProductReviewService=async(req)=>{
    try{
  const ProductID =new objectID(req.params.productId);
  let matchStage={$match:{productID:ProductID}}

let JoinWithProducts={$lookup:{from:'products',localField:'productID',foreignField:'_id',as:'Product'}}
let JoinWithProfile={$lookup:{from:'profiles',localField:'userID',foreignField:'userID',as:'Profile'}}
let unwind1={$unwind:'$Product'}
let unwind2={$unwind:'$Profile'}
let projectionProduct={
 $project:{
    'createdAt':0,
    'updatedAt':0,
    'productID':0,
    'userID':0,
    'Product._id':0,
    'Product.createdAt':0,
    'Product.updatedAt':0,
    'Product.brandID':0,
    'Product.categoryID':0,
}
}

let projectionProfile={$project:{
    'Profile._id':0,
    'Profile.userID':0,
    'Profile.createdAt':0,
    'Profile.updatedAt':0,

}}

let data=await ReviewModel.aggregate([matchStage,JoinWithProducts,JoinWithProfile,unwind1,unwind2,projectionProduct,projectionProfile])
return {status:true,data:data}
    }catch(err){
        return{status:false,data:err}
    }
}


const ProductFindByKeywordService=async(req)=>{
   try{
 let SearchRegex={$regex:req.params.Keyword}
 let Searchparams=[{title:SearchRegex},{shortDes:SearchRegex}]
 let SearchQuery={$or:Searchparams}
 let matchStage={$match:SearchQuery}

 let JoinwithBrand={$lookup:{from:'brands',localField:'brandID',foreignField:'_id',as:'Brand'}}

 let JoinwithCat={$lookup:{from:'categories',localField:'categoryID',foreignField:'_id',as:'Category'}}

let unwind1={$unwind:'$Brand'}
let unwind2={$unwind:'$Category'}


  let brandProjection={$project:{
    
        'createdAt':0,
        'updatedAt':0,
         'Brand._id':0,
        'Brand.createdAt':0,
        'Brand.updatedAt':0
     }}

  let catProjection={$project:{
         'Category._id':0,
        'Category.createdAt':0,
        'Category.updatedAt':0
  }}

  let data=await ProductModel.aggregate([matchStage,JoinwithBrand,JoinwithCat,unwind1,unwind2,brandProjection,catProjection])

  return{status:true,data:data}

   }catch(err){
    return{status:false,data:err}
   }
}

const ProductCreateReviewService=async(req)=>{
 try{
 let user_id=req.headers['user_id']
 let reqBody=req.body;
 let data=await ReviewModel.create({
   userID:user_id,
   productID:reqBody['productID'],
   ...reqBody 
 })
 return{status:true,message:'Review added',data:data}
 }catch(err){
  return{status:false,data:err.toString()}
 }
}

const ProductReviewListService=async(req)=>{
  try{
  //let data= await ReviewModel.find()
  let matchStage={$match:{}}
  let projection={$project:{
    'updatedAt':0,
    'createdAt':0,
    '_id':0,
  }}
  let data=await ReviewModel.aggregate([matchStage,projection])
  return{status:true,message:'List of reviews',data:data}
  }catch(err){
   return {status:true,data:err.toString()}
  }

  
}

  module.exports={ReadBrandListService,ReadCategoryListService,
    ReadSliderListService,ProductListByBrandService,
    ProductListByCatService,ProductWithBrand_CatService,
    ProductDetailsService,ProductFindByRemarkService,ProductReviewService,
    ProductFindByKeywordService,ProductCreateReviewService,ProductReviewListService  
}