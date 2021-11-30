import User from "../models/user.js";

//services to call
export const search = (params={})=>{
    const promise = User.find(params).exec();
    return promise;
}

export const create = (user) => {
    const newUser = new User(user);
    return newUser.save();
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
// user name and password match

export const match =(username)=>{
    const promise = User.findOne({userName:username});
    return promise;
}