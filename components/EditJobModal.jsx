import { useState, useEffect } from 'react';

function EditJobModal({ job, onClose, onJobUpdated }) {
  const [serviceType, setServiceType] = useState('');
  const [serviceDate, setServiceDate] = useState('');
  const [status, setStatus] = useState('Scheduled');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (job) {
      setServiceType(job.serviceType);
      setServiceDate(job.serviceDate);
      setStatus(job.status);
      setAmount(job.amount || '');
    }
  }, [job]);

  if (!job) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedData = { serviceType, serviceDate, status, amount: parseFloat(amount) };
    try {
      const response = await fetch(`http://localhost:5001/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error('Failed to update job');
      const updatedJob = await response.json();
      onJobUpdated(updatedJob);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay active">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h3 className="modal-title">✏️ Edit Job</h3>
            <button type="button" className="modal-close" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Service Type</label>
              <input type="text" className="form-control" value={serviceType} onChange={e => setServiceType(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Service Date</label>
              <input type="date" className="form-control" value={serviceDate} onChange={e => setServiceDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-control" value={status} onChange={e => setStatus(e.target.value)}>
                <option>Scheduled</option>
                <option>Completed</option>
              </select>
            </div>
             <div className="form-group">
                <label className="form-label">Amount</label>
                <input type="number" step="0.01" className="form-control" value={amount} onChange={e => setAmount(e.target.value)} />
              </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditJobModal;