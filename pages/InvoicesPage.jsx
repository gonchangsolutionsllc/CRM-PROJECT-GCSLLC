// Location: frontend/src/pages/InvoicesPage.jsx

import { useState, useEffect } from 'react';
import AddInvoiceModal from '../components/AddInvoiceModal';
import EditInvoiceModal from '../components/EditInvoiceModal';

function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/invoices')
      .then(res => res.json())
      .then(data => setInvoices(data))
      .catch(err => console.error("Failed to fetch invoices:", err));
  }, []);

  const handleInvoiceAdded = (newInvoice) => {
    setInvoices(currentInvoices => [...currentInvoices, newInvoice]);
  };

  const handleInvoiceUpdated = (updatedInvoice) => {
    setInvoices(currentInvoices =>
      currentInvoices.map(inv => (inv.id === updatedInvoice.id ? updatedInvoice : inv))
    );
  };

  const handleDeleteInvoice = async (invoiceId) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        await fetch(`http://localhost:5001/api/invoices/${invoiceId}`, { method: 'DELETE' });
        setInvoices(currentInvoices => currentInvoices.filter(inv => inv.id !== invoiceId));
      } catch (error) {
        console.error("Failed to delete invoice:", error);
      }
    }
  };

  return (
    <>
      <div className="content-container">
        <div className="content-section">
          <div className="section-header">
            <div className="section-title">📄 Invoice Management</div>
            <div className="section-actions">
              <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
                ➕ Create Invoice
              </button>
            </div>
          </div>
          <div className="section-content">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map(invoice => (
                    <tr key={invoice.id}>
                      <td>{invoice.customerName}</td>
                      <td>${invoice.amount.toFixed(2)}</td>
                      <td>{invoice.dueDate}</td>
                      <td><span className="badge badge-info">{invoice.status}</span></td>
                      <td>
                        <button className="btn btn-sm btn-primary" onClick={() => setEditingInvoice(invoice)}>Edit</button>
                        <button className="btn btn-sm btn-danger" style={{marginLeft: '5px'}} onClick={() => handleDeleteInvoice(invoice.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <AddInvoiceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onInvoiceAdded={handleInvoiceAdded}
      />
      <EditInvoiceModal
        invoice={editingInvoice}
        onClose={() => setEditingInvoice(null)}
        onInvoiceUpdated={handleInvoiceUpdated}
      />
    </>
  );
}

export default InvoicesPage;
