import mongoose from "mongoose";

const Schema = mongoose.Schema

const escritorio = new Schema({
    numero: {type:String, default: "0", unique:true}
})

export default mongoose.model("escritorio", escritorio)