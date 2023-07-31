import React from "react";
import styles from "./ImageControl.module.css";
import DoubleButton from "../UI/DoubleButton";
import { ImCloudUpload, ImBin, ImLab } from "react-icons/im";

const ImageControl = (props) => {
  return (
    <div
      className={styles["image-control"]}
      style={{ "--button-hover-bg-color": props.colorStyle }}>
      <button className="button-upload">
        <label
          htmlFor={styles["image-upload"]}
          className={styles["image-upload-label"]}>
          <ImCloudUpload />
        </label>
        <input
          id={styles["image-upload"]}
          type="file"
          onChange={props.onFileSelected}
        />
      </button>
      <button className="button-clear" onClick={props.onClearClick}>
        <ImBin />
      </button>

      <DoubleButton
        onClickLeft={props.onUndoClick}
        onClickRight={props.onRedoClick}
      />

      <button
        className={styles["button-inpaint"]}
        // onClick={props.onInpaintClick}
      >
        <ImLab />
      </button>
    </div>
  );
};

export default ImageControl;
