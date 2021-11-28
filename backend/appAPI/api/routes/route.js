import express from "express";
import * as userController from '../controllers/user.js';
import * as aptController from '../controllers/apartment.js';

const router = express.Router();
// routes of address
// for user route
router.route('/user')
    .get(userController.index)
    .post(userController.save);

router.route('/user/:id')
    .get(userController.get)
    .put(userController.update)
    .delete(userController.remove);
// for apartment route
router.route('/apt')
    .get(aptController.index)
    .post(aptController.save);

router.route('/apt/:id')
    .get(aptController.get)
    .put(aptController.update)
    .delete(aptController.remove);

export default router;