// Location: frontend/src/components/EditQuoteModal.jsx

import { useState, useEffect } from 'react';

function EditQuoteModal({ quote, onClose, onQuoteUpdated }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('Draft');

  // This effect runs when the 'quote' prop changes to pre-fill the form
  useEffect(() => {
    if (quote) {
      setTitle(quote.title);
      setAmount(quote.amount || '');
      setStatus(quote.status);
    }
  }, [quote]);

  if (!quote) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedData = { title, amount: parseFloat(amount), status };

    try {
      const response = await fetch(`http://localhost:5001/api/quotes/${quote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error('Failed to update quote');

      const updatedQuote = await response.json();
      onQuoteUpdated(updatedQuote); // Update the list in QuotesPage
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to update quote:", error);
    }
  };

  return (
    <div className="modal-overlay active">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">✏️ Edit Quote</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Quote Title *</label>
                <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Amount</label>
                <input type="number" step="0.01" className="form-control" value={amount} onChange={e => setAmount(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-control" value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
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

export default EditQuoteModal;
