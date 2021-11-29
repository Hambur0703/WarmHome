import express from "express";
import * as userController from '../controllers/user.js';
import * as aptController from '../controllers/apartment.js';
import multer from 'multer';


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './uploads');
    },
    filename: function(req,file,cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage})

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
    .post(upload.single('aptImage'),aptController.save);
    // .post(aptController.upload.single('aptImage'),aptController.save);
router.route('/apt/:id')
    .get(aptController.get)
    .put(aptController.update)
    .delete(aptController.remove);

export default router;