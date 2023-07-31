import React from "react";
import classes from "./ModelTab.module.css";

const ModelTab = (props) => {
  const tabStyle = `${classes.tab} ${
    props.data.is_loaded ? classes["loaded"] : classes["not-loaded"]
  }`;
  return (
    <option className={tabStyle} value={props.data.name}>
      {`${props.data.type}: ${props.data.name}`}
    </option>
  );
};

export default ModelTab;
