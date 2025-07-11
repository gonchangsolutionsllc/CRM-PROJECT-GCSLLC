// Location: frontend/src/components/AddInvoiceModal.jsx

import { useState, useEffect } from 'react';

function AddInvoiceModal({ isOpen, onClose, onInvoiceAdded }) {
  const [jobId, setJobId] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [invoiceableJobs, setInvoiceableJobs] = useState([]);

  useEffect(() => {
    if (isOpen) {
      // Fetch only jobs that can be invoiced
      fetch('http://localhost:5001/api/jobs?invoiceable=true')
        .then(res => res.json())
        .then(data => setInvoiceableJobs(data))
        .catch(error => console.error("Could not fetch invoiceable jobs:", error));
    }
  }, [isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const invoiceData = { jobId: parseInt(jobId), amount: parseFloat(amount), dueDate };

    try {
      const response = await fetch('http://localhost:5001/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData),
      });
      if (!response.ok) throw new Error('Failed to create invoice');
      const newInvoice = await response.json();
      onInvoiceAdded(newInvoice);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay active">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">📄 Create New Invoice</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Job to Invoice *</label>
                <select className="form-control" value={jobId} onChange={e => setJobId(e.target.value)} required>
                  <option value="" disabled>Select a completed job</option>
                  {invoiceableJobs.map(job => (
                    <option key={job.id} value={job.id}>
                      {job.customerName} - {job.serviceType}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Amount *</label>
                <input type="number" step="0.01" className="form-control" value={amount} onChange={e => setAmount(e.target.value)} required placeholder="e.g., 250.00" />
              </div>
              <div className="form-group">
                <label className="form-label">Due Date *</label>
                <input type="date" className="form-control" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">➕ Create Invoice</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddInvoiceModal;
