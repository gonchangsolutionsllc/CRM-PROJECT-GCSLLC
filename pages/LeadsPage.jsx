// Location: frontend/src/pages/LeadsPage.jsx

import { useState, useEffect } from 'react';
import AddLeadModal from '../components/AddLeadModal';
import EditLeadModal from '../components/EditLeadModal';

function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/leads')
      .then(res => res.json())
      .then(data => setLeads(data))
      .catch(err => console.error("Failed to fetch leads:", err));
  }, []);

  const handleLeadAdded = (newLead) => {
    setLeads(currentLeads => [...currentLeads, newLead]);
  };

  const handleLeadUpdated = (updatedLead) => {
    setLeads(currentLeads =>
      currentLeads.map(lead => (lead.id === updatedLead.id ? updatedLead : lead))
    );
  };

  const handleDeleteLead = async (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await fetch(`http://localhost:5001/api/leads/${leadId}`, { method: 'DELETE' });
        setLeads(currentLeads => currentLeads.filter(lead => lead.id !== leadId));
      } catch (error) {
        console.error("Failed to delete lead:", error);
      }
    }
  };

  return (
    <>
      <div className="content-container">
        <div className="content-section">
          <div className="section-header">
            <div className="section-title">🎯 Lead Management</div>
            <div className="section-actions">
              <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
                ➕ Add Lead
              </button>
            </div>
          </div>
          <div className="section-content">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Lead Name</th>
                    <th>Contact Info</th>
                    <th>Source</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map(lead => (
                    <tr key={lead.id}>
                      <td>{lead.fullName}</td>
                      <td>{lead.email}<br />{lead.phone}</td>
                      <td>{lead.source}</td>
                      <td><span className="badge badge-info">{lead.status}</span></td>
                      <td>
                        <button className="btn btn-sm btn-primary" onClick={() => setEditingLead(lead)}>Edit</button>
                        <button className="btn btn-sm btn-danger" style={{marginLeft: '5px'}} onClick={() => handleDeleteLead(lead.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <AddLeadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onLeadAdded={handleLeadAdded}
      />
      <EditLeadModal
        lead={editingLead}
        onClose={() => setEditingLead(null)}
        onLeadUpdated={handleLeadUpdated}
      />
    </>
  );
}

export default LeadsPage;