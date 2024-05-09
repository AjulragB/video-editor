import express from 'express';
import userController from '../controllers/userController.js';
import fileUpload from '../middlewares/multer.js'
const userRoutes = express.Router();



userRoutes.get('/hello', userController.sayHello);
userRoutes.post('/edit-video', fileUpload.fields([{ name: 'video' }, { name: 'audio' }, {name: 'image'}]), userController.editVideo);


export default userRoutes;
