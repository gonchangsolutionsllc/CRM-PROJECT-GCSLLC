// Location: frontend/src/components/DashboardCard.jsx

function DashboardCard({ title, value, trend, icon }) {
  const isPositive = trend && trend.startsWith('+');
  const trendColor = isPositive ? 'var(--success)' : 'var(--danger)';

  return (
    <div className="new-dashboard-card">
      <div className="card-icon-container">{icon}</div>
      <div className="card-details">
        <span className="card-title">{title}</span>
        <span className="card-value">{value}</span>
        {trend && (
          <span className="card-trend" style={{ color: trendColor }}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

export default DashboardCard;
