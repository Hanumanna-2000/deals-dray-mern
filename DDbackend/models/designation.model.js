const {Schema,model} = require('mongoose');

let designationSchema=new Schema({
    f_Designation:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

module.exports=new model('designation',designationSchema)