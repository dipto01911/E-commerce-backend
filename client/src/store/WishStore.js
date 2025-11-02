
import axios from "axios";
import { create } from "zustand";
import {persist} from 'zustand/middleware'
import { unauthorized } from "../utility/utils";



const WishStore=create(
    persist((set)=>({
 isWishSubmit:false,
 WishSaveRequest:async(productID)=>{
    try{
 set({isWishSubmit:true});
 let res=await axios.post(`/api/v1/SaveWishList`,{productID:productID});
 return res.data['status']===true;
    }catch(e){
    unauthorized(e.response.status);
    }finally{
        set({isWishSubmit:false});
    }
 },
Wishlist:null,
WishCount:0,

WishListRequest:async()=>{
    try{
let res=await axios.get(`/api/v1/ReadWishList`);
set({Wishlist:res.data['data']})
set({WishCount:(res.data['data']).length});
    }catch(e){
        unauthorized(e.response.status)
    }
},

RemoveWishListRequest:async(productID)=>{
  try{
set((state)=>({
    Wishlist:state.Wishlist?.filter((item)=>item.id !== productID),
    WishCount:state.WishCount-1,
}));
  
await axios.post(`/api/v1/RemoveWishList`,{productID:productID});
    }catch(e){
        unauthorized(e.response.status)
    }
},
}),
{
    name:"wish-store",
     partialize:(state)=>({
        Wishlist:state.Wishlist,
        WishCount :state.WishCount
    })
}
));


export default WishStore;