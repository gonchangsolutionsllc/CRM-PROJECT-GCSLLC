// Location: frontend/src/components/EditCustomerModal.jsx

import { useState, useEffect } from 'react';

// It receives the customer being edited, and functions to close and update
function EditCustomerModal({ customer, onUpdate, onClose }) {
  // State for each form field
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // This effect runs when the 'customer' prop changes
  // It pre-fills the form with the customer's data
  useEffect(() => {
    if (customer) {
      setFullName(customer.fullName);
      setCompanyName(customer.companyName || '');
      setEmail(customer.email);
      setPhone(customer.phone);
    }
  }, [customer]);

  // If no customer is being edited, don't render the modal
  if (!customer) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedData = { fullName, companyName, email, phone };

    try {
      // Send a PUT request to the backend with the updated data
      const response = await fetch(`http://localhost:5001/api/customers/${customer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const updatedCustomer = await response.json();
      onUpdate(updatedCustomer); // Update the customer list in App.jsx
      onClose(); // Close the modal

    } catch (error) {
      console.error("Failed to update customer:", error);
    }
  };

  return (
    <div className="modal-overlay active">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">✏️ Edit Customer</h3>
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
            <button type="submit" className="btn btn-primary">💾 Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCustomerModal;
