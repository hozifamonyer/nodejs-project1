const mongoose=require("mongoose")
const schama = mongoose.Schema

const articlesschama = new schama({
    title:String,
    body:String,
    numbrtlikes:Number
}) 
const Article =mongoose.model("Aritcle",articlesschama)
module.exports = Article 