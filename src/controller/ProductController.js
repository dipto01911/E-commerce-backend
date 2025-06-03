
const {ReadBrandListService,ReadCategoryListService,
ReadSliderListService,
ProductListByBrandService,
ProductListByCatService,ProductWithBrand_CatService,
ProductDetailsService,
ProductFindByRemarkService,
ProductReviewService,
ProductFindByKeywordService,
ProductCreateReviewService,
ProductReviewListService
}=require('../service/ProductService')

const ReadBrandList=async(req,res)=>{
 await ReadBrandListService(req,res);

}

const ReadCategoryList=async(req,res)=>{
   await ReadCategoryListService(req,res);
}

const ReadSliderList=async(req,res)=>{
    await ReadSliderListService(req,res);
}


const ProductListByBrand=async(req,res)=>{
 let result= await ProductListByBrandService(req);
 return res.status(200).json(result)
} 

const ProductListByCategories=async(req,res)=>{
 let result=await ProductListByCatService(req)
 return res.status(200).json(result)
}

const ProductWithBrand_Cat=async(req,res)=>{
 let result=await ProductWithBrand_CatService(req)
 return res.status(200).json(result)
}

const ProductDetails=async(req,res)=>{
    let result= await ProductDetailsService(req);
    return res.status(200).json(result)
}

const ProductFindByRemark=async(req,res)=>{
 let result=await ProductFindByRemarkService(req)
 return res.status(200).json(result)
}

const ProductReview=async(req,res)=>{
    let result= await ProductReviewService(req)
    return res.status(200).json(result)
}

const ProductFindByKeyword=async(req,res)=>{
    let result=await ProductFindByKeywordService(req)
    return res.status(200).json(result)
}

const ProductCreateReview=async(req,res)=>{
    let result= await ProductCreateReviewService(req)
    return res.status(200).json(result)
}

const ProductReviewList=async(req,res)=>{
 let result= await ProductReviewListService(req);
 return res.status(200).json(result)
}

module.exports={ReadBrandList,ReadCategoryList,ReadSliderList,
    ProductListByBrand,ProductListByCategories,ProductWithBrand_Cat,
    ProductDetails,ProductFindByRemark,ProductReview,
    ProductFindByKeyword,ProductCreateReview,ProductReviewList
}