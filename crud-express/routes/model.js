const mongoose=require('mongoose')

const schema_pro=mongoose.Schema({

    name:String,
    price:String
})

const model_pro=mongoose.model("products",schema_pro)

module.exports=model_pro;