import { useState } from 'react';

function AddCustomerModal({ isOpen, onCustomerAdded, onClose }) {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const customerData = { fullName, companyName, email, phone };
    try {
      const response = await fetch('http://localhost:5001/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData),
      });
      if (!response.ok) throw new Error('Something went wrong');
      const newCustomer = await response.json();
      onCustomerAdded(newCustomer);
      onClose();
    } catch (error) {
      console.error("Failed to add customer:", error);
    }
  };

  // The only change is on the line below: using backticks `` instead of single quotes ''
  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`}>
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">✨ Add New Customer</h3>
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
                <label className="form-label">Company Name</label>
                <input type="text" className="form-control" value={companyName} onChange={e => setCompanyName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input type="tel" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} required />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">👥 Save Customer</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCustomerModal;