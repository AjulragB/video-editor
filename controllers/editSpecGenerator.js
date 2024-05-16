const generateEditSpec = ({ trimStart, trimEnd, videoPath, textOverlay, slideTextOverlay }) => {
    const trimDuration = parseInt(trimEnd) - parseInt(trimStart);
    
    return {
      outPath: './uploads/out/edited.mp4',
      width: 600,
      height: 200,
      clips: 
      [
        {
          duration: trimDuration,
          layers: [
            {
              type: 'video',
              path: videoPath,
            }
          ]
        },
        {
          duration: trimDuration,
          layers: [
            {
              type: 'title',
              text: textOverlay,
              position: {
                x: 0.5,
                y: 0.5,
              },
              fontSize: 0.05,
            }
          ]
        },
        {
          duration: trimDuration,
          layers: [
            {
              type: 'slide-in-text',
              text: slideTextOverlay,
              position: {
                x: 0.5,
                y: 0.5,
              },
              fontSize: 0.05,
            } 
          ]
        },
        {
            duration: 3,
            layers: [
              {
                transition: { name: "crosszoom" },
                type: "gl", fragmentPath: "./Shader.frag"
              }
              ]  
        },
      ],
    };
  };
  
  export default generateEditSpec;
  