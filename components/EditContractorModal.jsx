// Location: frontend/src/components/EditContractorModal.jsx

import { useState, useEffect } from 'react';

function EditContractorModal({ contractor, onClose, onContractorUpdated }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [rate, setRate] = useState('');

  useEffect(() => {
    if (contractor) {
      setFullName(contractor.fullName);
      setPhone(contractor.phone || '');
      setRate(contractor.rate || '');
    }
  }, [contractor]);

  if (!contractor) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedData = { fullName, phone, rate: parseFloat(rate) };
    try {
      const response = await fetch(`http://localhost:5001/api/contractors/${contractor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error('Failed to update contractor');
      const updatedContractor = await response.json();
      onContractorUpdated(updatedContractor);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay active">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">✏️ Edit Contractor</h3>
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
            <button type="submit" className="btn btn-primary">💾 Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditContractorModal;
