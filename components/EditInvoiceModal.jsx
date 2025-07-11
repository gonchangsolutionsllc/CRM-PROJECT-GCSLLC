// Location: frontend/src/components/EditInvoiceModal.jsx

import { useState, useEffect } from 'react';

function EditInvoiceModal({ invoice, onClose, onInvoiceUpdated }) {
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Draft');

  useEffect(() => {
    if (invoice) {
      setAmount(invoice.amount);
      setDueDate(invoice.dueDate);
      setStatus(invoice.status);
    }
  }, [invoice]);

  if (!invoice) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedData = { amount: parseFloat(amount), dueDate, status };

    try {
      const response = await fetch(`http://localhost:5001/api/invoices/${invoice.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error('Failed to update invoice');
      const updatedInvoice = await response.json();
      onInvoiceUpdated(updatedInvoice);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay active">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">✏️ Edit Invoice</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Amount *</label>
                <input type="number" step="0.01" className="form-control" value={amount} onChange={e => setAmount(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Due Date *</label>
                <input type="date" className="form-control" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Status *</label>
                <select className="form-control" value={status} onChange={e => setStatus(e.target.value)} required>
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Paid">Paid</option>
                  <option value="Past Due">Past Due</option>
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

export default EditInvoiceModal;
