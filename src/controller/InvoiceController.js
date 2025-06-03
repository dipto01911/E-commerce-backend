

const{CreateInvoiceService,PaymentFailService,PaymentCancelService,
   PaymentIPNService,PaymentSuccessService,InvoiceListService,
   InvoiceProductListService}=require('../service/InvoiceService')


   const CreateInvoice=async(req,res)=>{
      let result=await CreateInvoiceService(req);
      return res.status(200).json(result)
   }

   const PaymentSucess=async(req,res)=>{
      await PaymentSuccessService(req)
      //return res.redirect('/orders')
   }

   const PaymentFail=async(req,res)=>{
      PaymentFailService(req);
      //return res.redirect('/orders')
   }
  
   const PaymentCancel=async(req,res)=>{
      await PaymentCancelService(req)
      return res.redirect('/orders')
   }
const PaymentIPN=async(req,res)=>{
   let result= await PaymentIPNService(req)
    return res.status(200).json(result)
}

const InvoiceList=async(req,res)=>{
  let result= await InvoiceListService(req)
 return res.status(200).json(result)
}

const InvoiceProductList=async(req,res)=>{
 let result= await InvoiceProductListService(req)
 return res.status(200).json(result)
}
    
module.exports={CreateInvoice,PaymentSucess,
   PaymentFail,PaymentCancel,PaymentIPN,InvoiceList,InvoiceProductList}
 