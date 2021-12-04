import * as aptServices from '../services/apartment.js';

/**
 * apartment controllers, include method to change data and show data. 
 */

// success and error handler
const errorhandler = (message, response) => {
    response.status(500);
    response.json({ error: message });
};

const setSuccessResponse = (data, response) => {
    response.status(200);
    response.json(data);
}
// get all apartments
export const index = async (request, response) => {
    try {
        const apts = await aptServices.search();
        setSuccessResponse(apts, response);
    } catch (e) {
        errorhandler(e.message, response);
    }

};

// for save new apartment
export const save = async (request, response) => {
    try {
        // upload.single('aptImage');
        console.log(request.file);
        const apt = { ...request.body,aptImage:'http://localhost:3002/'+request.file.path.replace("\\","/")};
        const newApt = await aptServices.create(apt);
        setSuccessResponse(newApt, response);
    } catch (e) {
        errorhandler(e.message, response)
    }
};
//for get apartment by id
export const get = async (request, response) => {
    try {
        const id = request.params.id;
        const apt = await aptServices.get(id);
        setSuccessResponse(apt, response);
    } catch (e) {
        errorhandler(e.message, response)
    }
};
//for update apartment
export const update = async (request, response) => {
    try {
        const id = request.params.id;
        const apt = { ...request.body, id };
        const newApt = await aptServices.update(apt);
        setSuccessResponse(newApt, response);
    } catch (e) {
        errorhandler(e.message, response)
    }
};
//for delete apartment
export const remove = async (request, response) => {
    try {
        const id = request.params.id;
        const apt = await aptServices.remove(id);
        setSuccessResponse({ message: `Apartment ${id} remove successfully` }, response);
    } catch (e) {
        errorhandler(e.message, response)
    }
};

