// Location: frontend/src/components/AddRequestModal.jsx

import { useState, useEffect } from 'react';

function AddRequestModal({ isOpen, onClose, onRequestAdded }) {
  const [customerId, setCustomerId] = useState('');
  const [title, setTitle] = useState('');
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (isOpen) {
      // Reset form when opening
      setCustomerId('');
      setTitle('');

      // Fetch customers for the dropdown
      fetch('http://localhost:5001/api/customers')
        .then(res => res.json())
        .then(data => setCustomers(data))
        .catch(error => console.error("Could not fetch customers:", error));
    }
  }, [isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestData = { customerId: parseInt(customerId), title };

    try {
      const response = await fetch('http://localhost:5001/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) throw new Error('Failed to create request');
      const newRequest = await response.json();
      onRequestAdded(newRequest); // Update the UI on the RequestsPage
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
          <h3 className="modal-title">📬 Add New Request</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Customer *</label>
                <select className="form-control" value={customerId} onChange={e => setCustomerId(e.target.value)} required>
                  <option value="" disabled>Select an existing customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                      {customer.fullName}
                    </option>
                  ))}
                </select>
              </div>
               <div className="form-group">
                <label className="form-label">Request Title / Details *</label>
                <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g., Leaky faucet in kitchen" />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">➕ Add Request</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRequestModal;
