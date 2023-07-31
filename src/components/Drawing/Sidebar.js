import React, { useState } from "react";
import classes from "./Sidebar.module.css";
import { ImFolderDownload } from "react-icons/im";

const RoundButton = ({ color, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        margin: "5px",
      }}
    />
  );
};

const Sidebar = (props) => {
  const toggleMaskPreview = () => {
    props.setPreviewMask((prevState) => !prevState);
  };

  const savePanelHandler = () => {
    const originalCanvas = props.canvasRef.current;

    // Create a new temporary canvas
    const whiteMaskCanvas = document.createElement("canvas");
    whiteMaskCanvas.width = originalCanvas.width;
    whiteMaskCanvas.height = originalCanvas.height;
    const whiteMaskCtx = whiteMaskCanvas.getContext("2d");

    // Draw the original canvas on the temporary canvas
    whiteMaskCtx.drawImage(originalCanvas, 0, 0);

    // Get the image data of the temporary canvas
    const imageData = whiteMaskCtx.getImageData(
      0,
      0,
      whiteMaskCanvas.width,
      whiteMaskCanvas.height
    );
    const data = imageData.data;

    // Convert non-black pixels to white with no transparency
    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];

      if (red !== 0 || green !== 0 || blue !== 0) {
        data[i] = 255; // Set red to 255 (white)
        data[i + 1] = 255; // Set green to 255 (white)
        data[i + 2] = 255; // Set blue to 255 (white)
        data[i + 3] = 255; // Set alpha to 255 (no transparency)
      } else {
        data[i + 3] = 0;
      }
    }

    // Put the transformed image data back to the temporary canvas
    whiteMaskCtx.putImageData(imageData, 0, 0);

    saveImageHandler(whiteMaskCanvas);
    saveMaskHandler(whiteMaskCanvas);
  };

  const saveMaskHandler = (whiteMaskCanvas) => {
    // Download the transformed mask
    const link = document.createElement("a");
    link.download = "mask.png";
    link.href = whiteMaskCanvas.toDataURL();
    link.click();
    link.remove();
  };

  const saveImageHandler = (whiteMaskCanvas) => {
    const originalImg = new Image();
    originalImg.src = props.selectedImgUrl;
    originalImg.onload = () => {
      const hybridCanvas = document.createElement("canvas");
      hybridCanvas.width = whiteMaskCanvas.width;
      hybridCanvas.height = whiteMaskCanvas.height;
      const hybridCtx = hybridCanvas.getContext("2d");

      // Draw the original image on the hybrid canvas
      hybridCtx.drawImage(
        originalImg,
        0,
        0,
        hybridCanvas.width,
        hybridCanvas.height
      );

      // Apply the white mask on top of the hybrid canvas
      // hybridCtx.globalCompositeOperation = "destination-in";
      hybridCtx.drawImage(whiteMaskCanvas, 0, 0);

      // Download the hybrid image
      const link = document.createElement("a");
      link.download = "masked_image.png";
      link.href = hybridCanvas.toDataURL();
      link.click();
      link.remove();
    };
  };

  const handleColorChange = (color) => {
    console.log(`the colorStyle is ${props.colorStyle}`);
    props.setColorStyle(color);
  };

  return (
    <div className={classes.sidebar}>
      <label>Size:</label>
      <input
        type="number"
        onChange={(e) => {
          props.onSizeChange(+e.target.value);
        }}
        defaultValue={props.serverSize}
      />
      <div
        className={classes["button-container"]}
        style={{ "--button-hover-bg-color": props.colorStyle }}>
        <button onClick={toggleMaskPreview}>
          {props.previewMask ? "original" : "graysacle"}
        </button>
        <button onClick={savePanelHandler}>
          <ImFolderDownload />
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}>
          <RoundButton
            color="rgb(230, 141, 150)"
            onClick={() => handleColorChange("rgb(230, 141, 150)")}
          />
          <RoundButton
            color="rgb(214, 255, 110)"
            onClick={() => handleColorChange("rgb(214, 255, 110)")}
          />
          <RoundButton
            color="rgb(141, 231, 223)"
            onClick={() => handleColorChange("rgb(141, 231, 223)")}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
