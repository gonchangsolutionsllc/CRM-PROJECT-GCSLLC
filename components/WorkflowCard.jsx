// Location: frontend/src/components/WorkflowCard.jsx
function WorkflowCard({ title, mainCount, statuses, color }) {
  return (
    <div className="workflow-card">
      <div className="workflow-card-header" style={{ borderTopColor: color }}>
        <span className="workflow-card-title">{title}</span>
        <span className="workflow-card-count">{mainCount}</span>
      </div>
      <div className="workflow-card-body">
        {statuses.map((status, index) => (
          <div key={index} className="workflow-status-row">
            <span>{status.label}</span>
            <span>{status.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkflowCard;
