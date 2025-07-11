// Location: frontend/src/pages/CustomersPage.jsx

import { useState, useEffect } from 'react';
import CustomerTable from '../components/CustomerTable';
import AddCustomerModal from '../components/AddCustomerModal';
import EditCustomerModal from '../components/EditCustomerModal';

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleCustomerAdded = (newCustomer) => {
    setCustomers(currentCustomers => [...currentCustomers, newCustomer]);
  };

  const handleDeleteCustomer = async (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await fetch(`http://localhost:5001/api/customers/${customerId}`, { method: 'DELETE' });
        setCustomers(currentCustomers => currentCustomers.filter(customer => customer.id !== customerId));
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  const handleCustomerUpdated = (updatedCustomer) => {
    setCustomers(currentCustomers =>
      currentCustomers.map(customer =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    );
  };

  return (
    <>
      <div className="content-container">
        <div className="content-section">
          <div className="section-header">
            <div className="section-title">👥 Customer Management</div>
            <div className="section-actions">
              <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
                ➕ Add Customer
              </button>
            </div>
          </div>
          <div className="section-content">
            <CustomerTable
              customers={customers}
              onDelete={handleDeleteCustomer}
              onEdit={setEditingCustomer}
            />
          </div>
        </div>
      </div>
      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCustomerAdded={handleCustomerAdded}
      />
      <EditCustomerModal
        customer={editingCustomer}
        onClose={() => setEditingCustomer(null)}
        onUpdate={handleCustomerUpdated}
      />
    </>
  );
}

export default CustomersPage;
