import "./App.css";
import { useState } from "react";
import DrawingPanel from "./components/Drawing/DrawingPanel";

import { FaBeer } from 'react-icons/fa';

// import useModels from "./hooks/use-models";
// import Results from "./components/Layout/Results";

function App() {
  const [outputData, setOuputData] = useState([]);
  const [outputIdx, setOutputIdx] = useState(0);

  // const [modelsData, loadModel] = useModels("http://127.0.0.1:8000/api/models");

  const processOutputData = (data) => {
    setOuputData(data);
    setOutputIdx((idx) => idx + 1);
  };

  return (
    <div className="App">
      {/* <button onClick={() => alert("clicked")}><FaBeer/></button> */}
      <DrawingPanel
        className="drawing-panel"
        // modelsData={modelsData}
        onOutput={processOutputData}
      />

    </div>
  );
}

export default App;