const mongoose=require('mongoose')

const schema_reg=mongoose.Schema({

    name:String,
    email:String,
    password:String
})

const model_reg=mongoose.model("Users",schema_reg)

module.exports=model_reg;