const colors = {
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
    red: "bg-red-500",
  };
  
  const StatCard = ({ title, total, color }) => (
    <div className={`${colors[color]} text-white rounded-xl shadow p-6`}>
      <h3 className="text-sm">{title}</h3>
      <p className="text-4xl font-bold mt-3">{total}</p>
    </div>
  );
  
  export default StatCard;