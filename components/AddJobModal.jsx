// Location: frontend/src/components/AddJobModal.jsx

import { useState, useEffect } from 'react';

function AddJobModal({ isOpen, onClose, onJobAdded }) {
  // State for the form fields
  const [customerId, setCustomerId] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [serviceDate, setServiceDate] = useState('');

  // State to hold the list of customers for the dropdown
  const [customers, setCustomers] = useState([]);

  // This effect fetches the list of customers when the modal opens
  useEffect(() => {
    if (isOpen) {
      fetch('http://localhost:5001/api/customers')
        .then(res => res.json())
        .then(data => setCustomers(data))
        .catch(error => console.error("Could not fetch customers:", error));
    }
  }, [isOpen]); // The effect re-runs if 'isOpen' changes

  const handleSubmit = async (event) => {
    event.preventDefault();
    const jobData = { customerId, serviceType, serviceDate };

    try {
      const response = await fetch('http://localhost:5001/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
      });
      if (!response.ok) throw new Error('Failed to create job');
      const newJob = await response.json();
      onJobAdded(newJob); // Update the list on the JobsPage
      onClose(); // Close the modal
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay active">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">🧹 Create New Job</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Customer *</label>
                <select className="form-control" value={customerId} onChange={e => setCustomerId(e.target.value)} required>
                  <option value="" disabled>Select a customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                      {customer.fullName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Service Type *</label>
                <input type="text" className="form-control" value={serviceType} onChange={e => setServiceType(e.target.value)} required placeholder="e.g., Deep Cleaning" />
              </div>
              <div className="form-group">
                <label className="form-label">Service Date *</label>
                <input type="date" className="form-control" value={serviceDate} onChange={e => setServiceDate(e.target.value)} required />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">➕ Create Job</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddJobModal;
