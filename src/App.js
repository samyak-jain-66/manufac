import "./App.css";
import winedata from "../src/Wine-Data.json";
import ShowTable from "./components/ShowTable";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(new Map());
  useEffect(() => {
    let modifyData = new Map();
    winedata?.forEach((item) => {
      if (modifyData.has(item.Alcohol)) {
        let modifyArray = modifyData.get(item?.Alcohol);
        modifyArray.push(item);
        modifyData.set(item?.Alcohol, [...modifyArray]);
      } else {
        modifyData.set(item.Alcohol, [{ ...item }]);
      }
    });

    setData(modifyData);
  }, []);

  return (
    <div className="App">
      <ShowTable data={data} />
    </div>
  );
}

export default App;
