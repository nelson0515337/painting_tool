import React from "react";
import { useState, useEffect } from "react";
import useDrawing from "../../hooks/use-drawing-r";

import ImageControl from "./ImageControl";
import BrushSizeSelector from "./BrushSizeSelector";
import Sidebar from "./Sidebar";
import DrawingField from "./DrawingField";

import styles from "./DrawingPanel.module.css";

const DrawingPanel = (props) => {
  const [showDropzone, setShowDropzone] = useState(true);

  const imgSizeMax = 512;

  const [imageSize, setImageSize] = useState({ height: 0, width: 0 });

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImgUrl, setSelectedImgUrl] = useState(null);
  const [serverSize, setServerSize] = useState(512);
  const [previewMask, setPreviewMask] = useState(false);

  const [
    canvasRef,
    brushSize,
    setBrushSize,
    colorStyle,
    setColorStyle,
    startDrawing,
    finishDrawing,
    draw,
    clearCanvas,
    undoStepHandler,
    redoStepHandler,
    resetBuffers,
  ] = useDrawing();

  const loadImage = (file) => {
    if (!file) {
      return;
    }

    setSelectedFile(file);
    setShowDropzone(false);
    resetBuffers();

    if (selectedImgUrl) {
      URL.revokeObjectURL(selectedImgUrl);
    }
    const imgURL = URL.createObjectURL(file);

    const img = new Image();

    img.onload = () => {
      const minSize = Math.max(img.height, img.width);
      const resizeFactor = imgSizeMax / minSize;
      const newSize = {
        height: Math.round(img.height * resizeFactor),
        width: Math.round(img.width * resizeFactor),
      };
      setImageSize(newSize);
    };
    img.src = imgURL;
    setSelectedImgUrl(imgURL);
  };

  const fileSelectedHandler = (event) => {
    loadImage(event.target.files[0]);
  };

  const dropFileHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.items) {
      loadImage(event.dataTransfer.items[0].getAsFile());
    } else {
      loadImage(event.dataTransfer.files[0]);
    }
  };

  return (
    <div className={styles["control-panel"]}>
      <div className={styles["wrapper"]}>
        <div className={styles["drawing-container"]}>
          <DrawingField
            imageSize={imageSize}
            imgSizeMax={imgSizeMax}
            canvasRef={canvasRef}
            selectedImgUrl={selectedImgUrl}
            showDropzone={showDropzone}
            setShowDropzone={setShowDropzone}
            dropFileHandler={dropFileHandler}
            startDrawing={startDrawing}
            finishDrawing={finishDrawing}
            draw={draw}
            // lineWidthChange={lineWidthChange}
            setBrushSize={setBrushSize}
            previewMask={previewMask}
          />

          <BrushSizeSelector
            brushSize={brushSize}
            setBrushSize={setBrushSize}
            colorStyle={colorStyle}
          />
        </div>
        <div className={styles.test}>
          <Sidebar
            serverSize={serverSize}
            onSizeChange={setServerSize}
            canvasRef={canvasRef}
            selectedImgUrl={selectedImgUrl}
            previewMask={previewMask}
            setPreviewMask={setPreviewMask}
            colorStyle={colorStyle}
            setColorStyle={setColorStyle}
          />
        </div>
      </div>

      <ImageControl
        onFileSelected={fileSelectedHandler}
        // onInpaintClick={fileUploadHandler}
        onClearClick={clearCanvas}
        onUndoClick={undoStepHandler}
        onRedoClick={redoStepHandler}
        colorStyle={colorStyle}
      />
    </div>
  );
};

export default DrawingPanel;
