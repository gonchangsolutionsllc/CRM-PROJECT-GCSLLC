import  { useState, useEffect } from 'react';

function EditRequestModal({ request, onClose, onRequestUpdated }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (request) {
      setTitle(request.title);
      setStatus(request.status);
    }
  }, [request]);

  if (!request) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedData = { title, status };

    try {
      const response = await fetch(`http://localhost:5001/api/requests/${request.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error('Failed to update request');
      const updatedRequest = await response.json();
      onRequestUpdated(updatedRequest);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay active">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">✏️ Edit Request</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Request Title *</label>
              <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Status *</label>
              <select className="form-control" value={status} onChange={e => setStatus(e.target.value)} required>
                <option value="New">New</option>
                <option value="Assessment Complete">Assessment Complete</option>
                <option value="Converted to Quote">Converted to Quote</option>
              </select>
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

export default EditRequestModal;
