
const {SaveWishListService, ReadWishListService, RemoveWishListService}=require('../service/WishListService')

const SaveWishList=async(req,res)=>{
 let result=await SaveWishListService(req)
 return res.status(200).json(result)
}

const ReadWishList=async(req,res)=>{
    let result=await ReadWishListService(req)
    return res.status(200).json(result)
}
const RemoveWishList=async(req,res)=>{
    let result=await RemoveWishListService(req)
    return res.status(200).json(result)
}

module.exports={SaveWishList,ReadWishList,RemoveWishList}