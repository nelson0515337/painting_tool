import React, { useState } from "react";
import classes from "./Sidebar.module.css";
import MaskPreview from "./MaskPreview";

const Sidebar = (props) => {
  const [maskPreviewVisible, setMaskPreviewVisible] = useState(false);

  const toggleMaskPreview = () => {
    setMaskPreviewVisible((prevState) => !prevState);
  };

  const saveMaskHandler = () => {
    const originalCanvas = props.canvasRef.current;
    const originalCtx = originalCanvas.getContext("2d");

    // Create a new temporary canvas
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = originalCanvas.width;
    tempCanvas.height = originalCanvas.height;
    const tempCtx = tempCanvas.getContext("2d");

    // Draw the original canvas on the temporary canvas
    tempCtx.drawImage(originalCanvas, 0, 0);

    // Get the image data of the temporary canvas
    const imageData = tempCtx.getImageData(
      0,
      0,
      tempCanvas.width,
      tempCanvas.height
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
      }
    }

    // Put the transformed image data back to the temporary canvas
    tempCtx.putImageData(imageData, 0, 0);

    // Download the transformed mask
    const link = document.createElement("a");
    link.download = "mask.png";
    link.href = tempCanvas.toDataURL();
    link.click();
    link.remove();
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
      <div className={classes["button-container"]}>
        <button onClick={toggleMaskPreview}>preview</button>
        <button onClick={saveMaskHandler}>save mask</button>
        {maskPreviewVisible && (
          <MaskPreview
            maskDataURL={props.canvasRef.current.toDataURL()}
            width={props.canvasRef.current.width}
            height={props.canvasRef.current.height}
            onClose={toggleMaskPreview}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
