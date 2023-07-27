// MaskPreview.js
import React, { useRef, useEffect } from "react";

const MaskPreview = ({ maskDataURL, width, height, onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Load the mask image
    const img = new Image();
    img.src = maskDataURL;

    // When the image is loaded, draw it on the canvas without considering transparency
    img.onload = () => {
      ctx.drawImage(img, 0, 0);

      // Get the image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Loop through each pixel and set alpha to 255 (fully opaque)
      for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i + 3] = 255;
      }

      // Put the modified image data back onto the canvas
      ctx.putImageData(imageData, 0, 0);
    };
  }, [maskDataURL]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
      onClick={onClose}>
      <canvas
        ref={canvasRef}
        width={width} // Adjust the width as needed
        height={height} // Adjust the height as needed
        style={{
          border: "1px solid white", // White stroke
        }}
      />
    </div>
  );
};

export default MaskPreview;
