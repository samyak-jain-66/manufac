import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";

const elements = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];

const tableKey = ["Mean", "Median", "Mode"];

const ShowTable = ({ data }) => {
  const [tableTh, setTableTh] = useState(["Measure"]);
  useEffect(() => {
    if (data?.size > 0) {
      let tableThValues = [...tableTh];
      for (let i = 0; i < data?.size; i++) {
        tableThValues.push(`Class ${i + 1}`);
        setTableTh([...tableThValues]);
      }
      const arrayOfArrays = new Array(data?.size).fill().map(() => []);
      for (const [key, value] of data) {
        arrayOfArrays[Number(key) - 1] = [...value];
      }

      let resultArray = [];
      for (let i = 0; i < data?.size; i++) {
        resultArray.push({ key: tableKey[i] });
      }
      for (let i = 0; i < arrayOfArrays.length; i++) {
        calculate(arrayOfArrays[i], resultArray, i);
      }
      console.log("hhgh", resultArray);
    }
  }, [data]);

  const calculate = (classData, resultArray, index) => {
    let meanValue = calculateMean(classData);
    let medianValue = calculateMedian(classData);
    let modeValue = calculateMode(classData);
    let meanIndex = resultArray.findIndex((item) => item.key === "Mean");
    let medianIndex = resultArray.findIndex((item) => item.key === "Median");
    let modeIndex = resultArray.findIndex((item) => item.key === "Mode");
    resultArray[meanIndex] = {
      ...resultArray[meanIndex],
      [`class_${index + 1}`]: meanValue,
    };
    resultArray[medianIndex] = {
      ...resultArray[medianIndex],
      [`class_${index + 1}`]: medianValue,
    };
    resultArray[modeIndex] = {
      ...resultArray[modeIndex],
      [`class_${index + 1}`]: modeValue,
    };
  };

  const calculateMean = (classData) => {
    let n = classData.length;
    let sum = 0;
    classData.forEach((item) => {
      sum += Number(item?.Flavanoids);
    });
    return sum / n;
  };

  const calculateMedian = (classData) => {
    let n = classData.length;
    if (n % 2 == 1) {
      let medianObjectIndex = (n + 1) / 2;

      return classData[medianObjectIndex]?.Flavanoids;
    } else {
      let medianObjectIndex = (n / 2 + (n / 2 + 1)) / 2;

      return classData[Math.floor(medianObjectIndex)]?.Flavanoids;
    }
  };

  const calculateMode = (classData) => {
    let modeMap = new Map();
    classData.forEach((item) => {
      if (modeMap.has(item?.Flavanoids)) {
        modeMap.set(item?.Flavanoids, modeMap.get(item?.Flavanoids) + 1);
      } else {
        modeMap.set(item?.Flavanoids, 1);
      }
    });
    let mostOccuringKey = -1;
    let maxValue = Number.MIN_SAFE_INTEGER;
    for (const [key, value] of modeMap) {
      if (value > maxValue) {
        mostOccuringKey = key;
      }
    }
    return mostOccuringKey;
  };

  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <Table>
        <Table.Thead>
          <Table.Tr>
            {tableTh &&
              tableTh?.length > 1 &&
              tableTh.map((item, index) => {
                return <Table.Th key={index}>{item}</Table.Th>;
              })}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};

export default ShowTable;
