import editly from 'editly';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import generateEditSpec from './editSpecGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const userController = {
    getHome: (req, res) => {
        res.render("users/home")
    },
    getEditor: (req, res) => {
      res.render("users/editor")
    },
    editVideo: async (req, res) => {
      try {
        if (!req.body.jsonData) {
          return res.status(400).json({ error: "Missing JSON data in the request body" });
        }
  
        const jsonData = JSON.parse(req.body.jsonData);
        const { trimStart, trimEnd, textOverlay, slideTextOverlay } = jsonData;
        const videoFile = req.files['video'][0];
        const videoPath = videoFile.path;
  
        const editSpec = generateEditSpec({ trimStart, trimEnd, videoPath, textOverlay, slideTextOverlay });
  
        await editly(editSpec);
  
        const editedVideoPath = './uploads/out/edited.mp4';
        const editedVideoData = fs.readFileSync(editedVideoPath);
  
        res.set('Content-Type', 'video/mp4');
        res.set('Content-Disposition', 'attachment; filename="edited.mp4"');
        res.send(editedVideoData);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error processing video" });
      }
    }
      
  
};


export default userController;
