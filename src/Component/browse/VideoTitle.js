import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute pt-[20%] px-20 bg-gradient-to-r from-black w-screen aspect-video text-white">
      <h1 className="font-bold text-5xl w-2/5">{title}</h1>
      <p className="my-2 py-2 w-1/4 text-gray-400">{overview}</p>
      <div>
        <button className="bg-white text-black py-4 px-16 rounded-md hover:bg-opacity-80">
          ▶️ Play
        </button>
        <button className="bg-gray-700 text-white py-4 px-16 rounded-md opacity-60 mx-4">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
