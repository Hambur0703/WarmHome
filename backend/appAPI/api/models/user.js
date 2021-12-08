import Mongoose from "mongoose";
// model for User data schema
const UserSchema = new Mongoose.Schema({
    "userName":{
        type: String,
        required:"UserName is a required filed."
    },
    "userPassword":{
        type: String,
        required:"UserPassword is a required filed."
    },
    "createDate":{
        type: Date,
        default:Date.now
    },
    "lastModifiedDate":{
        type: Date,
        default:Date.now
    }
});

UserSchema.virtual('id', () => this._id.toHexString());
UserSchema.set('toJSON',{virtuals:true});

const User = Mongoose.model('user', UserSchema);

export default User;