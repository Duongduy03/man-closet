import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import {v4 as uuidv4} from "uuid"

Chart.register(ArcElement);

const DoughnutChart = ({
  labelData,
  soldData,
  colorData,
}: {
  labelData: string[];
  soldData: number[];
  colorData: string[];
}) => {
  return (
    <>
      <Doughnut
        data={{
          labels: labelData,
          datasets: [
            {
              label: "# of votes",
              data: soldData,
              backgroundColor: colorData,
            },
          ],
        }}
        height={"140px"}
        width={"140px"}
      />
    </>
  );
};

const StatisticsChart = () => {
  const chartLabelData = [
    "Áo sweater",
    "Áo phông",
    "Áo Hoodie",
    "Quần Jogger",
    "Quần ống suông",
  ];

  const chartColorData = [
    "rgb(255, 99, 132)",
    "rgb(54, 162, 235)",
    "rgb(255, 205, 86)",
    "rgb(20 184 166)",
    "rgb(167 139 250)",
  ];

  return (
    <div className="bg-white px-6 py-3 rounded">
      <h2 className="text-center text-lg font-medium">Danh mục phổ biến</h2>
      <div className="flex lg:flex-col items-center lg:items-[unset] gap-4">
        <div className="py-2 lg:py-4">
          <DoughnutChart
            labelData={chartLabelData}
            soldData={[1, 1, 1, 1, 1]}
            colorData={chartColorData}
          />
        </div>
        <div className="details flex-[1]">
          <ul className="flex flex-col gap-2">
            {chartLabelData.map((item, index) => (
              <li key={uuidv4()} className="flex gap-2 items-center">
                <div
                  className={`w-[10px] h-[10px] rounded-sm`}
                  style={{ backgroundColor: chartColorData[index] }}
                ></div>
                <h5>{item}</h5>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatisticsChart;
