//@ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function Individuals({ data, name, dataKey, chartTitle }) {
  const [chartWidth, setChartWidth] = useState(0);

  // Dynamically update chart width
  useEffect(() => {
    const handleResize = () => {
      const containerWidth = document.getElementById("chart-container")?.offsetWidth || 0;
      setChartWidth(containerWidth);
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize); // Update on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter data by location
  const filteredData = data.filter((item) => item.location === name);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{chartTitle} - {name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div id="chart-container" className="w-full max-w-full overflow-x-auto">
          {chartWidth > 0 && (
            <LineChart
              data={filteredData}
              width={chartWidth}
              height={300}
              margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                }}
              />
              <YAxis />
              <Tooltip
                formatter={(value) => `${value}`}
                labelFormatter={(label) => {
                  const date = new Date(label);
                  return date.toLocaleString();
                }}
              />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
