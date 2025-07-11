import { useState, useEffect } from 'react';
import EditJobModal from '../components/EditJobModal';
// We will add AddJobModal later

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  const fetchJobs = () => {
    fetch('http://localhost:5001/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error("Failed to fetch jobs:", err));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobUpdated = (updatedJob) => {
    setJobs(currentJobs => currentJobs.map(j => (j.id === updatedJob.id ? updatedJob : j)));
  };

  return (
    <>
      <div className="content-container">
        <div className="content-section">
          <div className="section-header">
            <div className="section-title">🧹 Job Management</div>
            {/* Add Job button will be enabled later */}
          </div>
          <div className="section-content">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Service Type</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map(job => (
                    <tr key={job.id}>
                      <td>{job.customerName}</td>
                      <td>{job.serviceType}</td>
                      <td>{job.serviceDate}</td>
                      <td><span className="badge badge-warning">{job.status}</span></td>
                      <td>
                        <button className="btn btn-sm btn-primary" onClick={() => setEditingJob(job)}>Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <EditJobModal
        job={editingJob}
        onClose={() => setEditingJob(null)}
        onJobUpdated={handleJobUpdated}
      />
    </>
  );
}

export default JobsPage;
