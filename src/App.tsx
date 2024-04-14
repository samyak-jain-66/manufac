import winedata from "./Wine-Data.json";
import { useEffect, useState } from "react";
import ShowWineData from "./components/ShowWineData";
import "./App.css";
import { WineData } from "types/types";

function App() {
  const [data, setData] = useState<Map<number, []>>(new Map());

  useEffect(() => {
    let modifyData: any = new Map();
    winedata?.forEach((item: WineData) => {
      if (modifyData.has(item.Alcohol)) {
        let modifyArray = modifyData.get(item?.Alcohol);
        const newItem = {
          ...item,
          Gamma: (Number(item.Ash) * Number(item.Hue)) / Number(item.Magnesium),
        };
        modifyArray.push(newItem);
        modifyData.set(item?.Alcohol, [...modifyArray]);
      } else {
        const newItem = {
          ...item,
          Gamma: (Number(item.Ash) * Number(item.Hue)) / Number(item.Magnesium),
        };
        modifyData.set(item.Alcohol, [{ ...newItem }]);
      }
    });

    setData(modifyData);
  }, []);

  return (
    <div className="App">
      <ShowWineData data={data} compType={"Flavanoids"} />
      <br />
      <br />
      <ShowWineData data={data} compType={"Gamma"} />
    </div>
  );
}

export default App;
