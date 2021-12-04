import Apt from "../models/apartment.js";

/**
 * apartment services, include service to help controller. 
 */


//services to call
export const search = (params={})=>{
    const promise = Apt.find(params).exec();
    return promise;
}

export const create = (apt) => {
    const newApt = new Apt(apt);
    return newApt.save();
}

export const get = (id) => {
    const promise = Apt.findById(id).exec();
    return promise;
}
export const update = (apt)=>{
    apt._id=apt.id;
    const promise = Apt.findByIdAndUpdate(apt.id,apt,{new:true}).exec();
    return promise;
}
export const remove =(id)=>{
    const promise = Apt.findByIdAndRemove(id).exec();
    return promise;
}