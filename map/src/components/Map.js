import { useData } from "../hooks/useData";
import { Marks } from "./Marks";

function Map() {
  const width = 1000;
  const height = 1000;
  const data = useData();
  if (!data) return <p>Loading...</p>;
  return (
    <svg width={width} height={height}>
      <Marks data={data} />
    </svg>
  );
}

export default Map;
