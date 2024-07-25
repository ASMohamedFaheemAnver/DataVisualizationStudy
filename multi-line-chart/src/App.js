import logo from "./logo.svg";
import "./App.css";
import { useData } from "./useData";
import { LineChart } from "./LineChart";

const width = window.innerWidth;
const height = window.innerHeight;

const App = () => {
  const data = useData();
  return data ? (
    <LineChart data={data} width={width} height={height} />
  ) : (
    <div>Loading...</div>
  );
};

export default App;
