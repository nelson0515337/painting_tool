import React from "react";
import classes from "./DoubleButton.module.css";
import { ImUndo, ImRedo } from "react-icons/im";

const DoubleButton = (props) => {
  return (
    <div>
      <button className={classes["button-left"]} onClick={props.onClickLeft}>
        <ImUndo/>
      </button>
      <button className={classes["button-right"]} onClick={props.onClickRight}>
       <ImRedo/>
      </button>
    </div>
  );
};

export default DoubleButton;
