
const mongoose=require('mongoose')

const DataSchema=new mongoose.Schema({
 
    type: { type: String, required: true },
    description: { type: String, required: true },

},{
    versionKey:false,
    timestamps:true
})

const LegalModel=mongoose.model('legals',DataSchema)
module.exports=[LegalModel]