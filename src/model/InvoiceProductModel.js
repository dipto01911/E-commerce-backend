
const mongoose=require('mongoose')

const DataSchema=new mongoose.Schema({

     productID: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        userID: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        invoiceID: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        qty: {type: String, required:true},
        color: {type: String, required:true},
        size: {type: String, required:true}

},{
    versionKey:false,
    timestamps:true
})

const InvoiceProductModel=mongoose.model('invoiceproducts',DataSchema)
module.exports={InvoiceProductModel}