// Location: frontend/src/pages/ContractorsPage.jsx

import { useState, useEffect } from 'react';
import AddContractorModal from '../components/AddContractorModal';
import EditContractorModal from '../components/EditContractorModal';

function ContractorsPage() {
  const [contractors, setContractors] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingContractor, setEditingContractor] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/contractors')
      .then(res => res.json())
      .then(data => setContractors(data))
      .catch(err => console.error("Failed to fetch contractors:", err));
  }, []);

  const handleContractorAdded = (newContractor) => {
    setContractors(current => [...current, newContractor]);
  };

  const handleContractorUpdated = (updatedContractor) => {
    setContractors(current =>
      current.map(c => (c.id === updatedContractor.id ? updatedContractor : c))
    );
  };

  const handleDeleteContractor = async (contractorId) => {
    if (window.confirm('Are you sure you want to delete this contractor?')) {
      try {
        await fetch(`http://localhost:5001/api/contractors/${contractorId}`, { method: 'DELETE' });
        setContractors(current => current.filter(c => c.id !== contractorId));
      } catch (error) {
        console.error("Failed to delete contractor:", error);
      }
    }
  };

  return (
    <>
      <div className="content-container">
        <div className="content-section">
          <div className="section-header">
            <div className="section-title">👷 Contractor Management</div>
            <div className="section-actions">
              <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
                ➕ Add Contractor
              </button>
            </div>
          </div>
          <div className="section-content">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Hourly Rate</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contractors.map(contractor => (
                    <tr key={contractor.id}>
                      <td>{contractor.fullName}</td>
                      <td>{contractor.phone}</td>
                      <td>${contractor.rate ? contractor.rate.toFixed(2) : 'N/A'}</td>
                      <td>
                        <button className="btn btn-sm btn-primary" onClick={() => setEditingContractor(contractor)}>Edit</button>
                        <button className="btn btn-sm btn-danger" style={{marginLeft: '5px'}} onClick={() => handleDeleteContractor(contractor.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <AddContractorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onContractorAdded={handleContractorAdded}
      />
      <EditContractorModal
        contractor={editingContractor}
        onClose={() => setEditingContractor(null)}
        onContractorUpdated={handleContractorUpdated}
      />
    </>
  );
}

export default ContractorsPage;
