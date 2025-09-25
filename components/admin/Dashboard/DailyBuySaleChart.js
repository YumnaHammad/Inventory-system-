/*
 * Business-IMS — Inventory Management System
 * Copyright (c) 2025 Sk Sahbir Hossain
 * Licensed under a custom license. Personal use, Unauthorized use, reproduction, or distribution is strictly prohibited.
 * Official Repository: https://github.com/sksabbirhossain/business-ims
 *Contact Info: https://www.linkedin.com/in/sk-sabbir-hossain
 */

"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#f87171", "#15B392"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "middle" : "middle"}
      dominantBaseline="central"
      fontWeight="normal"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const DailyBuySaleChart = ({ buySales }) => {
  // Create mock data if no data is provided
  const mockData = [
    { name: "Buy", value: 150000 },
    { name: "Sales", value: 200000 },
  ];

  const data = [
    { name: "Buy", value: buySales?.totalPurchase || 150000 },
    { name: "Sales", value: buySales?.totalSales || 200000 },
  ];

  // Ensure we have valid data
  const chartData = data.filter(item => item.value > 0);

  return (
    <ResponsiveContainer width="100%" height="110%">
      <PieChart style={{ outline: "none" }}>
        <Pie
          data={chartData.length > 0 ? chartData : mockData}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
          style={{ outline: "none" }}
        >
          {(chartData.length > 0 ? chartData : mockData).map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <text
          x="50%"
          y="50%"
          dy={8}
          textAnchor="middle"
          fill="black"
          fontSize={14}
          fontWeight="bold"
        >
          Buy & Sales
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DailyBuySaleChart;
