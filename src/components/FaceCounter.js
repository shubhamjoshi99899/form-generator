import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const FaceCounter = ({ setFaceCount }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [count, setCount] = useState(0);
  const [highestCount, setHighestCount] = useState(0);
  const [facingMode, setFacingMode] = useState("user");

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode } })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing webcam: ", err));
    };

    loadModels().then(startVideo);

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const handleVideoPlay = async () => {
    if (videoRef.current && canvasRef.current) {
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;

      const displaySize = {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      };
      faceapi.matchDimensions(canvasRef.current, displaySize);

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions(),
          )
          .withFaceLandmarks()
          .withFaceDescriptors();

        const currentCount = detections.length;
        setCount(currentCount);
        setHighestCount((prevHighestCount) =>
          Math.max(prevHighestCount, currentCount),
        );
        setFaceCount(currentCount, Math.max(highestCount, currentCount));

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize,
        );

        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
          );
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        }
      }, 100);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("play", handleVideoPlay);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("play", handleVideoPlay);
      }
    };
  }, [videoRef]);

  const switchCamera = () => {
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 3,
          color: "white",
        }}
      >
        Number of faces detected: {count}
      </div>
      <button
        onClick={switchCamera}
        style={{ position: "absolute", bottom: 10, left: 10, zIndex: 3 }}
      >
        Switch Camera
      </button>
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 3,
          color: "white",
        }}
      >
        Highest face count: {highestCount}
      </div>
    </div>
  );
};

export default FaceCounter;
