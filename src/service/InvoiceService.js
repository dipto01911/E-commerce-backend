
const mongoose=require('mongoose')
const objectID= mongoose.Types.ObjectId;
const axios=require('axios')
const FormData=require('form-data');
const { CartModel } = require('../model/CartListModel');

// const CreateInvoiceService=async(req)=>{
//   try{
    
// let user_id=new objectID(req.headers['user_id'])
// let email=req.headers['email']

// let matchStage={$match:{userID:user_id}}
// let JoinWithproduct={$lookup:{from:'products',localField:'productID',foreignField:'_id',as:'product'}}
// let unwind1={$unwind:'$product'}
// let CartProduct= await CartModel.aggregate([matchStage,JoinWithproduct,unwind1])

// return{status:true,data:CartProduct}
//   }catch(err){
//     return{status:false,message:'Something went wrong',data:err.toString()}
//   }
// }

// const mongoose=require('mongoose')
//const FormData=require('form-data')
//const objectID=mongoose.Types.ObjectId;
//const { CartModel } = require('../model/CartListModel');


const { ProfileModel } = require('../model/ProfileModel');
const { InvoiceModel } = require('../model/InvoiceModel');
const { InvoiceProductModel } = require('../model/InvoiceProductModel');
const { PaymentSettingModel } = require('../model/PaymentSettingModel');

const CreateInvoiceService=async(req)=>{
 
    try{

    let user_id=new objectID(req.headers['user_id'])
     let email=req.headers['email']

     //1.Calculate Total, Payable and Vat by joining CartModel and ProductModel

    let matchStage={$match:{userID:user_id}} 
    let JoinWithProduct={$lookup:{from:'products',localField:'productID',foreignField:'_id',as:'product'}}
    let unwind1={$unwind:'$product'}
    let CartPorducts=await CartModel.aggregate([matchStage,JoinWithProduct,unwind1])
    
    let total=0;
   
    CartPorducts.forEach((element)=>{
        let price;
        if(element['product']['discount']){
        price=parseFloat(element['product']['discountPrice'])
        }else{
        price=parseFloat(element['product']['price'])
        }
        total=total+parseFloat(element['qty'])*price;
    })
    

    let vat = total*0.05 //where vat is 5%
    let payable=vat+total;
    //console.log(total,vat,payable)

        
    //2.prepare Customer Details & Shiping Details by joining ProfileModel


    let profile=await ProfileModel.aggregate([matchStage]) 
    let cus_details=`Name:${profile[0]['cus_name']}, Email:${email} ,Address:${profile[0]['cus_city']}, Phone:${profile[0]['cus_phone']}`
     let ship_details=`Name:${profile[0]['cus_name']}, City:${profile[0]['ship_city']}, Address:${profile[0]['ship_add']} ,Phone:${profile[0]['ship_phone']}`
    
     //console.log(cus_details,ship_details)

//3.Transaction id by using random function

let tran_id=Math.floor(100000000 + Math.random()*900000000)
let val_id=0;
let delivery_status='pending'
let payment_status='pending'

//4.Create Invoice

let CreateInvoice=await InvoiceModel.create({

      userID:user_id,
      payable: payable ,
      cus_details:cus_details ,
      ship_details:ship_details ,
      tran_id: tran_id,
      val_id:val_id,
      payment_status: payment_status,
      delivery_status: delivery_status,
      total: total,
      vat: vat,

})
 
//return {status:true,data:CreateInvoice}

//console.log(CreateInvoice)

//5.Create Invoice Product

let invoice_id=CreateInvoice['_id']
CartPorducts.forEach( async (element)=>{
  await InvoiceProductModel.create({
      userID:user_id,
      productID:element['productID'],
      invoiceID:invoice_id,
      qty:element['qty'],
      price:element['product']['discount']?element['product']['discountPrice'] :element['product']['price'],
      color:element['color'],
      size:element['size']
       
  })
})

//6.Remove the Cart from CartList when Invoice are created 

//await CartModel.deleteMany({userID:user_id})


//7.Prepare for ssl commerze

let Payment=await PaymentSettingModel.find()
 const form=new FormData()

form.append('store_id',Payment[0]['store_id'])

//store_passwd can not read
 form.append('store_passwd','teamr600c004f8da4d@ssl')
 form.append('total_amount',payable.toString())
 form.append('currency',Payment[0]['currency'])
 form.append('tran_id',tran_id)
 //form.append('product_category',)
 form.append('success_url',`${Payment[0]['success_url']}/${tran_id}`)
 form.append('fail_url',`${Payment[0]['fail_url']}/${tran_id}`)
 form.append('cancel_url',`${Payment[0]['cancel_url']}/${tran_id}`)
 form.append('ipn_url',`${Payment[0]['ipn_url']}/${tran_id}`)

 //Customer Details

  form.append('cus_name',profile[0]['cus_name'])
  form.append('cus_email',email)  
  form.append('cus_add1',profile[0]['cus_add'])
   form.append('cus_add2',profile[0]['cus_add'])    
  form.append('cus_city',profile[0]['cus_city'])
  form.append('cus_state',profile[0]['cus_state'])  
  form.append('cus_postcode',profile[0]['cus_postcode'])  
  form.append('cus_country',profile[0]['cus_country'])  
  form.append('cus_phone',profile[0]['cus_phone'])   
  form.append('cus_fax',profile[0]['cus_phone'])   

  //Shiping information
 
   form.append('shipping_method',"YES")
   form.append('ship_name',profile[0]['ship_name'])
   form.append('ship_add1',profile[0]['ship_add'])
   form.append('ship_add2',profile[0]['ship_add'])
   form.append('ship_city',profile[0]['ship_city'])
   form.append('ship_state',profile[0]['ship_state'])
   form.append('ship_country',profile[0]['ship_country'])
   form.append('ship_postcode',profile[0]['ship_postcode'])
   
    form.append('product_category','According Invoice')
    form.append('product_profile','According Invoice')
    form.append('product_amount','According Invoice') 
    form.append('product_name','According Invoice')

 let SSLRes= await axios.post(Payment[0]['init_url'],form)
 console.log(SSLRes.data)
  return {status:true,data:SSLRes.data}

    }catch(err){
        return{status:false,data:err.toString()}
        
    }
   
}

const PaymentSuccessService=async(req)=>{

    try{
 let trxID=req.params.trxID;
     await InvoiceModel.updateOne({tran_id:trxID},{payment_status:'success'})  
     return{status:'successs',message:'Payment Success'}
  }catch(err){
   return{status:false,message:'Something went wrong',data:err.toString()}
  }
}


const PaymentFailService=async(req)=>{
  try{

      let trxID=req.params.trxID;
     await InvoiceModel.updateOne({tran_id:trxID},{payment_status:'failed'})  
     return{status:'failed',message:'something went worng'} 
  }catch(err){
   return{status:false,message:'Something went wrong',data:err.toString()}
  }
}

const PaymentCancelService=async(req)=>{
  try{

      let trxID=req.params.trxID;
     await InvoiceModel.updateOne({tran_id:trxID},{payment_status:'cancel'})  
     return{status:'cancel',message:'something went worng'} 
  }catch(err){
   return{status:false,message:'Something went wrong',data:err.toString()}
  }
}

const PaymentIPNService=async(req)=>{

    try{
       let trxID=req.params.trxID;
       let status=req.body['status']
       await InvoiceModel.updateOne({tran_id:trxID},{payment_status:status})
     return{status:'success'}
  }catch(err){
   return{status:false,message:'Something went wrong',data:err.toString()}
  }
}




const InvoiceListService=async(req)=>{

    try{
 
      let user_id=req.headers['user_id']
      let invoice=await InvoiceModel.find({userID:user_id})
   return{status:true,data:invoice}
  }catch(err){
   return{status:false,message:'Something went wrong',data:err.toString()}
  }
}

const InvoiceProductListService=async(req)=>{

   try{

    let user_id= new objectID(req.headers['user_id']);
    let invoice_id=new objectID(req.params.invoice_id);
    let matchStage={$match:{userID:user_id,invoiceID:invoice_id}}
    let JoinWithProduct={$lookup:{from:'products',localField:'productID',foreignField:'_id',as:'product'}}
    let unwind1={$unwind:'$product'}

    let data=await InvoiceProductModel.aggregate([matchStage,JoinWithProduct,unwind1])
    return{status:true,message:'Details  of all product consist in Invoice',data:data}
    
  }catch(err){
   return{status:false,message:'Something went wrong',data:err.toString()}
  }
}


module.exports={CreateInvoiceService,PaymentFailService,PaymentCancelService,
   PaymentIPNService,PaymentSuccessService,InvoiceListService,InvoiceProductListService,
   CreateInvoiceService
}  