import React, { memo, useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF1025", "#C49F"];

const ChartDuration = ({ data }) => {
  const [chartDurationData, setChartDurationData] = useState([]);

  useEffect(() => {
    const counts = {};

    data.forEach((ele) => {
      let range;
      if (ele.numNights >= 1 && ele.numNights <= 3) {
        range = "1-3 nights";
      } else if (ele.numNights >= 4 && ele.numNights <= 7) {
        range = "4-7 nights";
      } else if (ele.numNights >= 8 && ele.numNights <= 11) {
        range = "8-11 nights";
      } else if (ele.numNights >= 13 && ele.numNights <= 17) {
        range = "13-17 nights";
      } else if (ele.numNights >= 18 && ele.numNights <= 21) {
        range = "18-21 nights";
      } else {
        range = "+21 nights";
      }

      counts[range] = (counts[range] || 0) + 1;
    });

    const formatted = Object.entries(counts).map(([name, value]) => ({
      name,
      value,
    }));

    setChartDurationData(formatted);
  }, [data]);

  return (
    <div className="bg-white rounded my-5 border-2 border-gray-100">
      <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center p-5">
        Stay duration summary
      </h2>

      {/* Large screens (2xl and above) - Legend on right */}
      <div className="hidden 2xl:block">
        <PieChart width={500} height={200}>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
          <Pie
            data={chartDurationData}
            cx={100}
            cy={100}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={3}
            dataKey="value"
          >
            {chartDurationData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>

      {/* Medium and small screens (xl and below) - Legend below */}
      <div className="2xl:hidden">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              align="center"
              layout="horizontal"
              iconSize={15}
              iconType="circle"
            />
            <Pie
              data={chartDurationData}
              cx="50%"
              cy="40%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={3}
              dataKey="value"
            >
              {chartDurationData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default memo(ChartDuration);
