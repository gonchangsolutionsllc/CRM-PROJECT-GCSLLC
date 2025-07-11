// Location: frontend/src/pages/DashboardPage.jsx

import { useState, useEffect } from 'react';
import WorkflowCard from '../components/WorkflowCard';
import TodaysAppointments from '../components/TodaysAppointments';
import BusinessPerformance from '../components/BusinessPerformance';

function DashboardPage() {
  const [workflowData, setWorkflowData] = useState({}); // Start with an empty object
  const [appointments, setAppointments] = useState({ stats: {}, jobs: [] });
  const [performance, setPerformance] = useState({ receivables: 0, upcomingJobs: 0 });

  useEffect(() => {
    fetch('http://localhost:5001/api/dashboard-stats')
      .then(res => res.json())
      .then(data => setWorkflowData(data))
      .catch(error => console.error("Could not fetch dashboard stats:", error));

    fetch('http://localhost:5001/api/today-appointments')
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(error => console.error("Could not fetch today's appointments:", error));

    fetch('http://localhost:5001/api/business-performance')
      .then(res => res.json())
      .then(data => setPerformance(data));

  }, []);

  return (
    <div>
      <h1 className="page-title">Good morning, Pablo</h1>

      <div className="dashboard-layout">
        <div className="main-column">
          <h2 className="section-title">Workflow</h2>
          <div className="workflow-section">
            {/* The ?. and ?? operators prevent crashes if data is loading */}
            <WorkflowCard title="Requests" color="#E77468" mainCount={workflowData.requests?.count ?? 0} statuses={workflowData.requests?.statuses ?? []} />
            <WorkflowCard title="Quotes" color="#F4A950" mainCount={workflowData.quotes?.count ?? 0} statuses={workflowData.quotes?.statuses ?? []} />
            <WorkflowCard title="Jobs" color="#34D399" mainCount={workflowData.jobs?.count ?? 0} statuses={workflowData.jobs?.statuses ?? []} />
            <WorkflowCard title="Invoices" color="#7562E0" mainCount={workflowData.invoices?.count ?? 0} statuses={workflowData.invoices?.statuses ?? []} />
          </div>

          <TodaysAppointments data={appointments} />
        </div>

        <div className="sidebar-column">
          <BusinessPerformance data={performance} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
