import  { useState } from "react";
import "./Edit.css";

const Edit = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null); 
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [textOverlay, setTextOverlay] = useState("");
  const [slideTextOverlay, setSlideTextOverlay] = useState("");
  const [editedVideoURL, setEditedVideoURL] = useState(null);
  const [videoURL, setVideoURL] = useState(null);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
    setVideoURL(URL.createObjectURL(file));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };
  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleWidthChange = (e) => {
    setWidth(e.target.value);
  };

  const handleAudioChange = (e) => { 
    const file = e.target.files[0];
    setAudioFile(file);
  };

  const handleTrimStartChange = (e) => {
    setTrimStart(e.target.value);
  };

  const handleTrimEndChange = (e) => {
    setTrimEnd(e.target.value);
  };

  

  const handleTextOverlayChange = (e) => {
    setTextOverlay(e.target.value);
  };

  const handleslideTextOverlayChange = (e) => {
    setSlideTextOverlay(e.target.value);
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("image", imageFile);
    formData.append("height", height);
    formData.append("width", width);
    formData.append("audio", audioFile);
    formData.append("trimStart", trimStart);
    formData.append("trimEnd", trimEnd);
    formData.append("textOverlay", textOverlay);
    formData.append("slideTextOverlay", slideTextOverlay);


    try {
      const response = await fetch("http://localhost:5000/api/users/edit-video", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Video edited successfully!");
        const blob = await response.blob();
        const editedVideoURL = URL.createObjectURL(blob);
        setEditedVideoURL(editedVideoURL);

        // Reset form fields after successful submission
        setVideoFile(null);
        setHeight("");
        setWidth("");
        setAudioFile(null);
        setTrimStart(0);
        setTrimEnd(0);
        setTextOverlay("");
        setSlideTextOverlay("");
        
      } else {
        console.error("Failed to edit video:", response.statusText);
      }
    } catch (error) {
      console.error("Error editing video:", error.message);
    }
  };

  return (
    <div className="video-editor-container">
      <h2 className="editor-title">Video Editor</h2>
      <div className="video-editor">
        <div className="video-preview">
          <h3>Selected Video</h3>
          <input type="file" id="videoFile" accept="video/*" onChange={handleVideoChange} />
          {videoURL && (
            <video controls className="preview-video">
              <source src={videoURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div className="options">
          <h3>Edit Options</h3>
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label htmlFor="videoFile">Upload Video:</label>
              <input type="file" id="videoFile" accept="video/*" onChange={handleVideoChange} />
            </div>
            <div className="form-group">
              <label htmlFor="audioFile">Upload Audio:</label> {/* New input for audio */}
              <input type="file" id="audioFile" accept="audio/*" onChange={handleAudioChange} />
            </div>
            <div className="form-group">
              <label htmlFor="imageFile">Upload Overlay:</label> {/* New input for audio */}
              <input type="file" id="imageFile" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="form-group">
              <label htmlFor="height">Height:</label>
              <input type="number" id="height" value={height} onChange={handleHeightChange} />
            </div>
            <div className="form-group">
              <label htmlFor="width">Width:</label>
              <input type="number" id="width" value={width} onChange={handleWidthChange} />
            </div>
            <div className="form-group">
              <label htmlFor="trimStart">Trim Start:</label>
              <input type="number" id="trimStart" value={trimStart} onChange={handleTrimStartChange} />
            </div>
            <div className="form-group">
              <label htmlFor="trimEnd">Trim End:</label>
              <input type="number" id="trimEnd" value={trimEnd} onChange={handleTrimEndChange} />
            </div>
            <div className="form-group">
              <label htmlFor="textOverlay">Text Overlay:</label>
              <input type="text" id="textOverlay" value={textOverlay} onChange={handleTextOverlayChange} />
            </div>
            <div className="form-group">
              <label htmlFor="slideTextOverlay">Slide In Text Overlay:</label>
              <input type="text" id="slideTextOverlay" value={slideTextOverlay} onChange={handleslideTextOverlayChange} />
            </div>
            
            <button type="submit" className="submit-btn">Apply Changes</button>
          </form>
        </div>
        <div className="edited-video">
          <h3>Edited Video</h3>
          {editedVideoURL && (
            <video controls className="edited-video-preview">
              <source src={editedVideoURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default Edit;