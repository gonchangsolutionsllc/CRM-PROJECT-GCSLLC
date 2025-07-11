// Location: frontend/src/components/TodaysAppointments.jsx

// This component receives the data fetched from the parent (DashboardPage)
function TodaysAppointments({ data }) {
  const formatCurrency = (value) => `$${(value || 0).toFixed(2)}`;

  return (
    <div className="appointments-section">
      <h2 className="section-title">Today's appointments</h2>

      <div className="appointment-stats">
        <div className="stat-card">
          <span>Total</span>
          <strong>{formatCurrency(data.stats.total)}</strong>
        </div>
        <div className="stat-card">
          <span>Completed</span>
          <strong style={{color: 'var(--success)'}}>{formatCurrency(data.stats.completed)}</strong>
        </div>
        <div className="stat-card">
          <span>Remaining</span>
          <strong>{formatCurrency(data.stats.remaining)}</strong>
        </div>
      </div>

      <div className="appointment-list">
        {data.jobs.map(job => (
          <div key={job.id} className="appointment-item">
            <div className="appointment-info">
              <strong>{job.customerName}</strong>
              <span>{job.serviceType}</span>
            </div>
            <div className="appointment-amount">
              {formatCurrency(job.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodaysAppointments;
