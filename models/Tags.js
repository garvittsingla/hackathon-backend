const mongoose =  require("mongoose")

const TagsModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

})

module.exports = mongoose.model("Tags", TagsModel)