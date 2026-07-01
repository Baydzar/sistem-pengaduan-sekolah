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
  
  const StatusChart = () => {
  
    const data = {
  
      labels: [
        "Pending",
        "Proses",
        "Selesai",
      ],
  
      datasets: [
        {
          data: [5, 8, 12],
        },
      ],
    };
  
    return (
  
        <div className="relative h-[380px]">
        <Pie
            data={data}
            options={{
                maintainAspectRatio: false,
                responsive: true,
            }}
        />
    </div>
  
    );
  
  };
  
  export default StatusChart;