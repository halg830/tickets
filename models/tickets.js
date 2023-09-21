import mongoose, { Mongoose } from "mongoose";

const Schema = mongoose.Schema

const ticket = new Schema({
    numero: {type:Number, require:true, unique: true},
    estado: {type:String, require:true},
    escritorio: {type: mongoose.Schema.Types.ObjectId, ref: "escritorio"}
})

export default mongoose.model("Ticket", ticket)