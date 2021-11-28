import User from "../models/user.js";

//services to call
export const search = (params={})=>{
    const promise = User.find(params).exec();
    return promise;
}

export const create = (user) => {
    const newContact = new User(user);
    return newContact.save();
}

export const get = (id) => {
    const promise = User.findById(id).exec();
    return promise;
}
export const update = (user)=>{
    user._id=user.id;
    const promise = User.findByIdAndUpdate(user.id,user,{new:true}).exec();
    return promise;
}
export const remove =(id)=>{
    const promise = User.findByIdAndRemove(id).exec();
    return promise;
}