import React, { useContext } from "react";
import { VideoContext } from "../../context/video";

export default function VideoInput(props) {
  const { width, height } = props;

  const {
    setVideoFile,
  } = useContext(VideoContext)

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);

    const video = document.getElementById("video");
    video.src = url;
    setVideoFile(video);
  };

  return (
    <div className="VideoInput">
      <input
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mp4,.webm,.ogg,.ogv,.avi,.mov,.wmv,.flv,.mpg,.mpeg,.m4v,.mkv"
      />
      <video
        className="VideoInput_video"
        height={height}
        width={width}
        controls
        id="video"
      />
    </div>
  );
}
