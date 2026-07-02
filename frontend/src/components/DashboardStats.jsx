export default function DashboardStats({ cards }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div key={card.label} className="metric-card">
          <p className="metric-label">{card.label}</p>
          <p className="metric-value">{card.value ?? "-"}</p>
        </div>
      ))}
    </div>
  );
}
