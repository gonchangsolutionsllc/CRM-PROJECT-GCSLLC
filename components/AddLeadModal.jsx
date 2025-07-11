// Location: frontend/src/components/AddLeadModal.jsx

import { useState } from 'react';

function AddLeadModal({ isOpen, onClose, onLeadAdded }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState('Website');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const leadData = { fullName, email, phone, source };

    try {
      const response = await fetch('http://localhost:5001/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });
      if (!response.ok) throw new Error('Failed to create lead');
      const newLead = await response.json();
      onLeadAdded(newLead);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  // This is no longer needed because the className handles visibility
  // if (!isOpen) return null; 

  return (
    // THIS IS THE CORRECTED LINE - Using backticks and dynamic class
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`}>
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">🎯 Add New Lead</h3>
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
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input type="tel" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Source</label>
                <select className="form-control" value={source} onChange={e => setSource(e.target.value)}>
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">➕ Add Lead</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLeadModal;
