// Location: frontend/src/components/EditLeadModal.jsx

import { useState, useEffect } from 'react';

function EditLeadModal({ lead, onClose, onLeadUpdated }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (lead) {
      setFullName(lead.fullName);
      setEmail(lead.email || '');
      setPhone(lead.phone || '');
      setSource(lead.source || 'Website');
      setStatus(lead.status || 'New');
    }
  }, [lead]);

  if (!lead) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedData = { fullName, email, phone, source, status };

    try {
      const response = await fetch(`http://localhost:5001/api/leads/${lead.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error('Failed to update lead');
      const updatedLead = await response.json();
      onLeadUpdated(updatedLead);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay active">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">✏️ Edit Lead</h3>
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
               <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-control" value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Lost">Lost</option>
                  <option value="Won">Won</option>
                </select>
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

export default EditLeadModal;
