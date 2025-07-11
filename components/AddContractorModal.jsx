// Location: frontend/src/components/AddContractorModal.jsx

import { useState } from 'react';

function AddContractorModal({ isOpen, onClose, onContractorAdded }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [rate, setRate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const contractorData = { fullName, phone, rate: parseFloat(rate) };
    try {
      const response = await fetch('http://localhost:5001/api/contractors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contractorData),
      });
      if (!response.ok) throw new Error('Failed to create contractor');
      const newContractor = await response.json();
      onContractorAdded(newContractor);
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
          <h3 className="modal-title">👷 Add New Contractor</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input type="text" className="form-control" value={fullName} onChange={e => setFullName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input type="tel" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Hourly Rate ($)</label>
                <input type="number" step="0.01" className="form-control" value={rate} onChange={e => setRate(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">➕ Add Contractor</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddContractorModal;
