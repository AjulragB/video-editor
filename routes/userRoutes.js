import express from 'express';
import userController from '../controllers/userController.js';
import fileUpload from '../middlewares/multer.js'
const userRoutes = express.Router();



userRoutes.post('/edit-video', fileUpload.fields([{ name: 'video' }]), userController.editVideo);


userRoutes.get('/', userController.getHome);
userRoutes.get('/editor',userController.getEditor)


export default userRoutes;
