import "./App.css";
import BackgroundCircle from "./components/BackgroundCircle";
import RightEye from "./components/RightEye";
import LeftEye from "./components/LeftEye";
import Mouth from "./components/Mouth";
import Nose from "./components/Nose";

function App() {
  return (
    <div>
      <svg width="960" height="500">
        <BackgroundCircle />
        <LeftEye />
        <RightEye />
        <Mouth />
        <Nose />
      </svg>
    </div>
  );
}

export default App;
