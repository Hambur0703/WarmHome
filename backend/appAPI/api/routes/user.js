import express from "express";
import * as userController from '../controllers/user.js';

const router = express.Router();
// routes of address
router.route('/user')
    .get(userController.index)
    .post(userController.save);

router.route('/user/:id')
    .get(userController.get)
    .put(userController.update)
    .delete(userController.remove);


export default router;