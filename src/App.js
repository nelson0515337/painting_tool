import "./App.css";
import { useState } from "react";
import DrawingPanel from "./components/Drawing/DrawingPanel";
import Header from "./components/Layout/Header";

// import useModels from "./hooks/use-models";
// import Results from "./components/Layout/Results";

function App() {
  const [outputData, setOuputData] = useState([]);
  const [outputIdx, setOutputIdx] = useState(0);
  const [useModel, setUseModel] = useState(null);

  // const [modelsData, loadModel] = useModels("http://127.0.0.1:8000/api/models");

  const processOutputData = (data) => {
    setOuputData(data);
    setOutputIdx((idx) => idx + 1);
  };

  const modelsData = [
    {
      name: "Model 1",
      type: "Type A",
      is_loaded: true,
    },
    {
      name: "Model 2",
      type: "Type B",
      is_loaded: false,
    },
    {
      name: "Model 3",
      type: "Type C",
      is_loaded: true,
    },
  ];

  return (
    <div className="App">
      <Header modelsData={modelsData} />

      <DrawingPanel
        className="drawing-panel"
        // modelsData={modelsData}
        onOutput={processOutputData}
      />
    </div>
  );
}

export default App;
