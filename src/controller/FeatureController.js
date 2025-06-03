const { FeatureListService } = require("../service/FeatureService")


 const FeatureList=async(req,res)=>{
   let result= await FeatureListService(req)
   return res.status(200).json(result)
 }

 module.exports={FeatureList}