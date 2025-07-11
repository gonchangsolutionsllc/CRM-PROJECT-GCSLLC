// Location: frontend/src/components/AddQuoteModal.jsx

import { useState, useEffect } from 'react';

function AddQuoteModal({ isOpen, onClose, onQuoteAdded }) {
  const [customerId, setCustomerId] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (isOpen) {
      // Reset form when opening
      setCustomerId('');
      setTitle('');
      setAmount('');

      // Fetch the list of customers for the dropdown
      fetch('http://localhost:5001/api/customers')
        .then(res => res.json())
        .then(data => setCustomers(data))
        .catch(error => console.error("Could not fetch customers:", error));
    }
  }, [isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const quoteData = { customerId: parseInt(customerId), title, amount: parseFloat(amount) };

    try {
      const response = await fetch('http://localhost:5001/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteData),
      });
      if (!response.ok) throw new Error('Failed to create quote');
      const newQuote = await response.json();
      onQuoteAdded(newQuote);
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
          <h3 className="modal-title">📝 Create New Quote</h3>
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
                <label className="form-label">Quote Title *</label>
                <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g., Kitchen Remodel" />
              </div>
              <div className="form-group">
                <label className="form-label">Amount</label>
                <input type="number" step="0.01" className="form-control" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g., 2500.00" />
              </div>
            </div>
          </div>
          {/* This is the footer that was missing */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">➕ Create Quote</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddQuoteModal;