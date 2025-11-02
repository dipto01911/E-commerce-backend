
import {create} from 'zustand';
import axios from 'axios';
import {unauthorized } from '../utility/utils';


const ReviewStore=create((set)=>({
    isReviewSubmit:false,
    ReviewFormData:{des:"",rating:"",productID:""},
    ReviewFormOnChange:(name,value)=>{
        set((state)=>({
           ReviewFormData:{
            ...state.ReviewFormData,
            [name]:value
           } 
        }))
    },

  ReviewSaveRequest:async(PostBody)=>{
    try{
    set({isReviewSubmit:true})
    let res=await axios.post(`/api/v1/CreateReview`,PostBody)
    return res.data['status']===true;
    }catch(e){
        unauthorized(e.response.status)
    }finally{
        set({isReviewSubmit:false})
    }
  }

}))

export default ReviewStore;