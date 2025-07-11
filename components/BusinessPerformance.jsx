// Location: frontend/src/components/BusinessPerformance.jsx

function BusinessPerformance({ data }) {
  const formatCurrency = (value) => `$${(value || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

  return (
    <div className="performance-section">
      <h2 className="section-title">Business Performance</h2>
      <div className="performance-card">
        <div className="performance-details">
          <span>Receivables</span>
          <strong>{formatCurrency(data.receivables)}</strong>
        </div>
        <span className="arrow-icon">{'>'}</span>
      </div>
      <div className="performance-card">
        <div className="performance-details">
          <span>Upcoming jobs</span>
          <strong>{formatCurrency(data.upcomingJobs)}</strong>
        </div>
        <span className="arrow-icon">{'>'}</span>
      </div>
    </div>
  );
}

export default BusinessPerformance;
