import mongoose from "mongoose";

const RecordModel = new mongoose.Schema({
    date: {type: String, required: true},
    time: {type: String, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    isOccupied: {type: Boolean, required: false},
    details: {type: String, required: false}
}, {versionKey: false});

export default mongoose.model('Record', RecordModel);