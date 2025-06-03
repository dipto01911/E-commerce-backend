
const { SaveCartService, UpdateCartService,
 RemoveCartService,ReadCartListService } = require("../service/CartService")




const SaveCart=async(req,res)=>{
 let result=await SaveCartService(req)
 return  res.status(200).json(result)
}

const UpdateCart=async(req,res)=>{
    let result=await UpdateCartService(req)
    return res.status(200).json(result)
}

const RemoveCart=async(req,res)=>{
    let result=await RemoveCartService(req);
    return res.status(200).json(result)
}

const ReadCart=async(req,res)=>{
    let result=await ReadCartListService(req)
    return res.status(200).json(result)
}

module.exports={SaveCart,UpdateCart,RemoveCart,ReadCart}