"use client";

import Chart from "react-apexcharts";

import { generatePast12Months } from "@/utils/booking-system/date-utils";

interface EarningsOverTimeChartProps {
  bookingRevenue: number[];
}

export default async function EarningsOverTimeChart({
  bookingRevenue,
}: EarningsOverTimeChartProps) {
  const series = [
    {
      data: bookingRevenue,
    },
  ];

  const options = {
    colors: ["hsl(var(--primary))"],
    chart: {
      height: 350,
      type: "bar",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      curve: "smooth",
    },
    xaxis: {
      categories: generatePast12Months(),
      title: {
        text: "Month",
      },
    },
    yaxis: {
      title: {
        text: "Earnings (EUR)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: string) {
          return val + " €";
        },
      },
    },
  };

  return (
    <div
      className={"flex h-full min-w-[50%] flex-col rounded-md bg-white p-10"}
    >
      <p className={"text-md text-xl font-bold"}>Earnings</p>
      <div className={"h-full min-h-[300px] w-full"}>
        <Chart
          options={options as any}
          series={series}
          type="bar"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}
