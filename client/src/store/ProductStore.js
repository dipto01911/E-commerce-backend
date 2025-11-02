
import {create} from "zustand"
import axios from "axios"

const ProductStore=create((set)=>({
BrandList:null,
BrandListRequest:async()=>{
    let res = await axios.get(`/api/v1/ProductBrandList`)
    set({BrandList:res.data['data']})
},

CategoryList:null,
CategoryListRequest:async()=>{
    let res=await axios.get(`/api/v1/ProductCategoryList`)
    set({CategoryList:res.data['data']})
},

SliderList:null,
SliderListRequest:async()=>{
    let res=await axios.get(`/api/v1/ProductSliderList`)
    set({SliderList:res.data['data']})
},

// ListByRemark:null,
// ListByRemarkRequest:async(Remark)=>{
//     let res=await axios.get(`/api/v1/ProductFindByRemark/${Remark}`)
//     set({ListByRemark:res.data['data']})
// },

ListProduct:null,
ListByBrandRequest:async(BrandId)=>{
    set({ListProduct:null})
    let res=await axios.get(`/api/v1/ProductListByBrand/${BrandId}`)
    console.log(res.data)
    if(res.data['status']===true){
    set({ListProduct:res.data['data']})
    }
    
},


ListByCategoryRequest:async(CategoryId)=>{
    set({ListProduct:null})
    let res=await axios.get(`/api/v1/ProductListByCategory/${CategoryId}`)
    if(res.data['status']===true){
    set({ListProduct:res.data['data']})
    }
    
},

ListByKeywordRequest:async(Keyword)=>{
    set({ListProduct:null})
    let res=await axios.get(`/api/v1/ProductFindByKeyword/${Keyword}`)
    if(res.data['status']===true){
    set({ListProduct:res.data['data']})
    }
    
},
SearchKeyword:"",
SetSearchKeyword:async(Keyword)=>{
    set({SearchKeyword:Keyword})
},
Details:null,
DetailsRequest:async(id)=>{
     set({Details:null})
     let res=await axios.get(`/api/v1/ProductDetails/${id}`);
     if(res.data['status']===true){
        set({Details:res.data['data']})
     }
},

ReviewList:null,
ReviewListRequest:async(id)=>{
     let res=await axios.get(`/api/v1/ProductReview/${id}`);
     if(res.data['status']===true){
        set({ReviewList:res.data['data']})
     }
}

}))

export default ProductStore;