import React, { useState, useEffect } from "react";
import styles from "./BrushSizeSelector.module.css";

const BrushSizeSelector = (props) => {
  const [sizeChanged, setSizeChanged] = useState(null);

  useEffect(() => {
    setSizeChanged((size) => (size === null ? false : true));

    const timeout = setTimeout(() => {
      setSizeChanged(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [props.brushSize]);

  const handleBrushSizeChange = (newBrushSize) => {
    props.setBrushSize(newBrushSize);
  };

  return (
    <div className={styles["brush-selector"]}>
      <div className={styles["draw-bar"]}>
        <input
          type="range"
          min="1"
          max="45"
          step="1"
          value={props.brushSize}
          onChange={(e) => handleBrushSizeChange(e.target.value)}
          className={styles["brush-slider"]}
        />
      </div>
      <div className={styles["brush-indicator-container"]}>
        <div
          className={styles["brush-indicator"]}
          style={{ width: `${props.brushSize}px`, height: `${props.brushSize}px` }}
        />
      </div>
      <span className={sizeChanged ? styles["font-large"] : ""}>
        {props.brushSize}
      </span>
    </div>
  );
};

export default BrushSizeSelector;
