import editly from 'editly';
import fs from 'fs';

const userController = {
    sayHello: (req, res) => {
        res.send('Hello World!');
    },
    editVideo : async (req, res) => {
        try {
            console.log("Received video details:", req.body, "===", req.file);
            const { height, width, trimStart, trimEnd, textOverlay,slideTextOverlay} = req.body;
            const videoFile = req.files['video'][0];
            const audioFile = req.files['audio'][0]; 
            const imageFile = req.files['image'][0]; 
        
            const trimDuration = trimEnd - trimStart;
        
            const layers = [
              { type: "video", path: videoFile.path },
              { type: "title",text: textOverlay,duration: trimDuration},
              { type: 'image-overlay', path: imageFile.path, width: 0.2, position: { x: 0.95, y: 0.03, originX: 'right' }},
              { type: 'slide-in-text', text: slideTextOverlay, color: '#010409', position: { x: 0.04, y: 0.93, originY: 'bottom', originX: 'left' }, fontSize: 0.05 },
              
            ];
            const audioFilePath = audioFile.path;
        
            await editly({
              inputs: [videoFile.path],
              width: parseInt(width),
              height: parseInt(height),
              outPath: "./uploads/out/edited.mp4",
              clips: [
                {
                  duration: trimDuration,
                  layers: layers,
                },
              ],
              audioTracks: [
                { path: audioFilePath, cutFrom: 0 }, // Use the uploaded audio file
            ],
            });
        
            // Read the edited video file
            const editedVideoPath = './uploads/out/edited.mp4';
            const editedVideoData = fs.readFileSync(editedVideoPath);

            // Set response headers
            res.set('Content-Type', 'video/mp4');
            res.set('Content-Disposition', 'attachment; filename="edited.mp4"');

            // Send the edited video to the frontend
            res.send(editedVideoData);
            
          } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error processing video" });
          }
      }
      
  
};


export default userController;
