
import { create } from "zustand";

import axios from "axios"
import { getEmail, setEmail, unauthorized } from "../utility/utils";
import Cookies from "js-cookie"
const UserStore=create((set)=>({
    
isLogin: () => {
   return !!Cookies.get("token");
},

// Equavalent Code
// SetUserLogin:()=>{
//    if(Cookies.get('token')){
//    return true
//    }else{
//     return false
//    }



  LoginFormData:{email:""},
  LoginFormOnChange:(name,value)=>{
    set((state)=>({
        LoginFormData:{
            ...state.LoginFormData,
            [name]:value
        }
    }))
  },

  UserLogoutRequest:async()=>{
 set({isFormSubmit:true})
 let res=await axios.get('/api/v1/UserLogout');
 set({isFormSubmit:false})
 return res.data['message']==="User Logout Success";
  },
  OTPFormData:{otp:""},
  OTPFormOnChange:(name,value)=>{
    set((state)=>({
        OTPFormData:{
            ...state.OTPFormData,
            [name]:value
        }
    }))
  },
    isFormSubmit:false,
     UserOTPRequest:async(email)=>{
        set({isFormSubmit:true})
        let res=await axios.get(`/api/v1/UserLogin/${email}`);
        setEmail(email);
        set({isFormSubmit:false})
       console.log(res.data);
         return res.data.result["status"]===true;
         

         
    },

    VerifyLoginRequest:async(otp)=>{
        set({isFormSubmit:true})
        let email=getEmail();
        let res=await axios.get(`/api/v1/Verify/${email}/${otp}`);
        set({isFormSubmit:false})
       // console.log(res.data["message"]);
        return res.data["message"]==="Verify Sucess";
    //console.log(res)
        
    },
ProfileForm:{
  cus_add:"",
  cus_city:"",
  cus_country:"",
  cus_fax:"",
  cus_name:"",
  cus_phone:"",
  cus_postcode:"",
  cus_state:"",
  ship_add:"",
  ship_city:"",
  ship_country:"",
  ship_name:"",
  ship_phone:"",
  ship_postcode:"",
  ship_state:"",
},

ProfileFormChange:(name,value)=>{
  set((state)=>({
    ProfileForm:{
      ...state.ProfileForm,
      [name]:value,
    },
  }))
},
ProfileDetails:null,
ProfileDetailsRequest:async()=>{
  try{
let res=await axios.get(`/api/v1/ReadProfile`);
if(res.data['data'].length>0){
  set({ProfileDetails:res.data['data'][0]});
  set({ProfileForm:res.data['data'][0]})
}else{
  set({ProfileDetails:[]});
}
  }catch(e){
    unauthorized(e.response.state)
  }
},
ProfileSaveRequest:async(PostBody)=>{
  try{
 set({ProfileDetails:null});
 let res=await axios.patch(`/api/v1/UpdateProfile`,PostBody);

 console.log(res);
 return res.data['status']===true;
  }catch(e){
    unauthorized(e.response.status)
  }
}



}))
export default UserStore;