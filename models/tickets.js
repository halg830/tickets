import mongoose from "mongoose";

const Schema = mongoose.Schema

const ticket = new Schema({
    numero: {type:Number, default: 0, unique: true}
})

export default mongoose.model("escritorio", ticket)