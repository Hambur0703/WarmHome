import * as userServices from '../services/user.js'

/**
 * user controllers, include method to change data and show data. 
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
// fail to login
const setFailResponse = (data, response) => {
    response.status(401);
    response.json(data);
}

// get all users
export const index = async (request, response) => {
    try {
        const users = await userServices.search();
        setSuccessResponse(users, response);
    } catch (e) {
        errorhandler(e.message, response);
    }

};

// for save new user
export const save = async (request, response) => {
    try {
        const user = { ...request.body };
        const newUser = await userServices.create(user);
        setSuccessResponse(newUser, response);
    } catch (e) {
        errorhandler(e.message, response)
    }
};
//for get user by id
export const get = async (request, response) => {
    try {
        const id = request.params.id;
        const user = await userServices.get(id);
        setSuccessResponse(user, response);
    } catch (e) {
        errorhandler(e.message, response)
    }
};
//for update user
export const update = async (request, response) => {
    try {
        const id = request.params.id;
        const user = { ...request.body, id };
        const newUser = await userServices.update(user);
        setSuccessResponse(newUser, response);
    } catch (e) {
        errorhandler(e.message, response)
    }
};
//for delete user
export const remove = async (request, response) => {
    try {
        const id = request.params.id;
        const user = await userServices.remove(id);
        setSuccessResponse({ message: `User ${id} remove successfully` }, response);
    } catch (e) {
        errorhandler(e.message, response)
    }
};

//user match

export const match = async (request, response) => {
    try {
        const username = request.body.userName;
        const passwordInput = request.body.userPassword;
        const user = await userServices.match(username);

        if (!user) {
            setFailResponse({ message: `User does not exist` }, response);
        } else {
            // console.log(user.userPassword);
            // console.log(passwordInput);

            if (passwordInput === user.userPassword) {
                setSuccessResponse({ message: `User Login successfully` }, response);
            } else {
                setFailResponse({ message: `Please try again` }, response);
            }
        }
    } catch (e) {
        errorhandler(e.message, response)
    }
};