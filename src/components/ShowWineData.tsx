import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import {
  calculateMean,
  calculateMedian,
  calculateMode,
} from "../utility/MathCalculation";
import { TableData } from "types/types";

function ShowWineData({
  data,
  compType,
}: {
  data: Map<number, []>;
  compType: string;
}) {
  const [tableHeader, setTableHeaders] = useState(["Measure"]);
  const [tableData, setTableData] = useState([
    { key: `${compType} Mean` },
    { key: `${compType} Median` },
    { key: `${compType} Mode` },
  ]);

  const prepareDataStructure = () => {
    let meanIndex = tableData.findIndex(
      (item: TableData) => item.key === `${compType} Mean`
    );
    let medianIndex = tableData.findIndex(
      (item) => item.key === `${compType} Median`
    );
    let modeIndex = tableData.findIndex(
      (item) => item.key === `${compType} Mode`
    );
    const newData = [...tableData];

    data?.forEach((value, key: number) => {
      const keyMean = calculateMean(value, compType);
      const keyMedian = calculateMedian(value, compType);
      const keyMode = calculateMode(value, compType);

      newData[meanIndex] = {
        ...newData[meanIndex],
        [`class_${key}`]: keyMean.toFixed(3),
      };
      newData[medianIndex] = {
        ...newData[medianIndex],
        [`class_${key}`]: keyMedian.toFixed(3),
      };
      newData[modeIndex] = {
        ...newData[modeIndex],
        [`class_${key}`]: keyMode.toFixed(3),
      };
    });
    setTableData(newData);
  };

  useEffect(() => {
    if (data?.size > 0) {
      let localTableHeaders = [...tableHeader];
      for (let i = 0; i < data?.size; i++) {
        localTableHeaders.push(`Class ${i + 1}`);
      }
      setTableHeaders([...localTableHeaders]);
    }

    prepareDataStructure();
  }, [data]);

  const rows = tableData.map((element: TableData, index: number) => {
    return (
      <Table.Tr key={element.key}>
        <Table.Td>{element.key}</Table.Td>
        <Table.Td>{element.class_1}</Table.Td>
        <Table.Td>{element.class_2}</Table.Td>
        <Table.Td>{element.class_3}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <div>
      <Table>
        <Table.Thead>
          <Table.Tr>
            {tableHeader &&
              tableHeader?.length > 1 &&
              tableHeader.map((item, index) => {
                return <Table.Th key={index}>{item}</Table.Th>;
              })}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}

export default ShowWineData;
