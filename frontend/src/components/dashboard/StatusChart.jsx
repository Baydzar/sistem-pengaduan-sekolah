import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
  } from "chart.js";
  
  import { Pie } from "react-chartjs-2";
  
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
  );
  
  const StatusChart = ({ stats }) => {
  
    const data = {
      labels: ["Pending", "Proses", "Selesai"],
  
      datasets: [
        {
          label: "Jumlah Pengaduan",
          data: [
            stats.pending,
            stats.proses,
            stats.selesai,
          ],
  
          backgroundColor: [
            "#eab308",
            "#3b82f6",
            "#22c55e",
          ],
        },
      ],
    };
  
    return (
      <div className="bg-white rounded-xl shadow p-5">
  
        <h2 className="text-xl font-semibold mb-4">
          Statistik Status Pengaduan
        </h2>
  
        <div className="relative h-[380px]">
          <Pie
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
  
      </div>
    );
  };
  
  export default StatusChart;