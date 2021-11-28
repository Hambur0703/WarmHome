import Mongoose from "mongoose";
// model for User data schema
const aparSchema = new Mongoose.Schema({
    "aptName":{
        type: String,
        required:"Name is a required filed."
    },
    "aptPrice":{
        type: String,
        required:"Price is a required filed."
    },
    "aptDes":{
        type: String,
        required:"Description is a required filed."
    },
    "aptAddress":{
        type: String,
        required:"Address is a required filed."
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

aparSchema.virtual('id', () => this._id.toHexString());
aparSchema.set('toJSON',{virtuals:true});

const Apt = Mongoose.model('apt', aparSchema);

export default Apt;