"use client";

import Chart from "react-apexcharts";

import { generatePast12Months } from "@/utils/booking-system/date-utils";

import { BookingWithDetails } from "@/types";

interface EarningsOverTimeChartProps {
  bookings: BookingWithDetails[];
}

export default function EarningsOverTimeChart({
  bookings,
}: EarningsOverTimeChartProps) {
  const series = [
    {
      name: "Earnings",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148], // TODO: Decide what data to show here, perhaps the sum of earnings for each month?
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
      className={
        "flex h-full min-w-[50%] flex-col items-start rounded-md bg-white p-10"
      }
    >
      <p className={"text-md text-xl font-bold"}>Earnings</p>
      <div className={"h-full w-full "}>
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
