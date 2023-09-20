import mongoose from "mongoose";

const Schema = mongoose.Schema

const ticket = new Schema({
    numero: {type:Number, require:true, unique: true},
    estado: {type:String, require:true}
})

export default mongoose.model("Ticket", ticket)