import mongoose, {Schema} from "mongoose";

const adminSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    accessToken: {type: String, required: true},
    accessTokenExpires: {type: String, required: true}
}, {versionKey: false});

export default mongoose.model('Admin-accounts', adminSchema);