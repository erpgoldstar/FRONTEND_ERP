import TitleCard from "../../../components/Cards/TitleCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import moment, { min } from "moment";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ chartYaxisName, array, xAxisLabels }) {
  const [chartData, setChartData] = useState(null);
  console.log(array);

  // Calculate total salaries by day and zone
  useEffect(() => {
    const data = {
      labels: xAxisLabels,
      datasets: [
        {
          label: "gold-star-1",
          data: new Array(xAxisLabels?.length).fill(0),
          backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
            16
          )}`,
        },
        {
          label: "gold-star-2",
          data: new Array(xAxisLabels?.length).fill(0),
          backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
            16
          )}`,
        },
        {
          label: "gold-star-3",
          data: new Array(xAxisLabels?.length).fill(0),
          backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
            16
          )}`,
        },
        {
          label: "gold-star-4",
          data: new Array(xAxisLabels?.length).fill(0),
          backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
            16
          )}`,
        },
      ],
    };

    array?.forEach((item) => {
      const createdAt = new Date(item.createdAt);
      const zone = item.zoneSlug;

      // for days
      const dayOfWeek = createdAt.getDay();

      // for weeks
      const startOfMonth = moment(createdAt).startOf("month");
      const currentWeek = moment(createdAt).diff(startOfMonth, "weeks");

      // for year
      const month = moment(createdAt).month();

      // Increment the salary for the corresponding day and zone
      if (item.salary) {
        if (xAxisLabels?.length === 7) {
          data.datasets.find((dataset) => dataset.label === zone).data[
            dayOfWeek
          ] += item.salary;
        } else if (xAxisLabels?.length === 5) {
          data.datasets.find((dataset) => dataset.label === zone).data[
            currentWeek
          ] += item.salary;
        } else if (xAxisLabels?.length === 12) {
          data.datasets.find((dataset) => dataset.label === zone).data[month] +=
            item.salary;
        }
      }

      if (item.amount) {
        if (xAxisLabels?.length === 7) {
          data.datasets.find((dataset) => dataset.label === zone).data[
            dayOfWeek
          ] += item.amount;
        } else if (xAxisLabels?.length === 5) {
          data.datasets.find((dataset) => dataset.label === zone).data[
            currentWeek
          ] += item.amount;
        } else if (xAxisLabels?.length === 12) {
          data.datasets.find((dataset) => dataset.label === zone).data[month] +=
            item.amount;
        }
      }
    });

    setChartData(data);
  }, [array]);

  return (
    <TitleCard>
      {chartData && (
        <Bar
          data={chartData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: `${chartYaxisName}`,
                },
              },
              x: {
                title: {
                  display: true,
                },
              },
            },
          }}
        />
      )}
    </TitleCard>
  );
}

export default BarChart;
