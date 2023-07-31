import React from "react";
import classes from "./Header.module.css";

import ModelTab from "../UI/ModelTab";

const Header = (props) => {
  // if (!props.modelsData) {
  //   return <pre>Loading models...</pre>;
  // }

  // const loadedModels = props.modelsData.filter((model) => model.is_loaded);
  // const unloadedModels = props.modelsData.filter((model) => !model.is_loaded);
  // const sortedModels = loadedModels.concat(unloadedModels);

  return (
    <header className={classes.header}>
      <div>
        <select className={classes["model-select"]} onChange={props.onSelect}>
          {props.modelsData.map((modelData) => (
            <ModelTab key={modelData.name} data={modelData} />
          ))}
        </select>
      </div>
    </header>
  );
};

export default Header;
