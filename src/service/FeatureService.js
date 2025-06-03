const { FeaturesModel } = require("../model/FeaturesModel")


const FeatureListService=async(req)=>{
  try{
 let data=await FeaturesModel.find()
 return{status:true,data:data}
  }catch(err){
    return{status:false,message:'Something went wrong',data:err.toString()}
  }
}

module.exports={FeatureListService}