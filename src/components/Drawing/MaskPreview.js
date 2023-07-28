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
        flexDirection: "column", // Change the flexDirection to column
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
      onClick={onClose}>
      {/* Text to instruct the user */}
      <div
        style={{
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "20px", // Add some bottom margin to separate from the canvas
        }}>
        Click anywhere to leave the mask preview
      </div>
      {/* Preview mask box */}
      <div
        style={{
          width: width,
          height: height,
          border: "1px solid white",
        }}>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{
            border: "1px solid white",
            boxSizing: "border-box",
          }}
        />
      </div>
    </div>
  );
};

export default MaskPreview;
