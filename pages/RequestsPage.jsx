import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddRequestModal from '../components/AddRequestModal';
import EditRequestModal from '../components/EditRequestModal';

function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const navigate = useNavigate();

  const fetchRequests = () => {
    fetch('http://localhost:5001/api/requests')
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.error("Failed to fetch requests:", err));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRequestAdded = (newRequest) => {
    setRequests(currentRequests => [...currentRequests, newRequest]);
  };

  const handleRequestUpdated = (updatedRequest) => {
    setRequests(currentRequests =>
      currentRequests.map(req => (req.id === updatedRequest.id ? updatedRequest : req))
    );
  };

  const handleDeleteRequest = async (requestId) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      try {
        await fetch(`http://localhost:5001/api/requests/${requestId}`, { method: 'DELETE' });
        fetchRequests(); // Refetch the list to ensure it's updated
      } catch (error) {
        console.error("Failed to delete request:", error);
      }
    }
  };

  const handleConvertToQuote = async (requestId) => {
    if (window.confirm('This will convert the request into a new draft quote. Proceed?')) {
      try {
        const response = await fetch(`http://localhost:5001/api/requests/${requestId}/convert-to-quote`, {
          method: 'POST',
        });
        if (!response.ok) throw new Error('Failed to convert request');
        navigate('/quotes'); // On success, go to the quotes page
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="content-container">
        <div className="content-section">
          <div className="section-header">
            <div className="section-title">📬 Request Management</div>
            <div className="section-actions">
              <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
                ➕ Add Request
              </button>
            </div>
          </div>
          <div className="section-content">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Request Title</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(request => (
                    <tr key={request.id}>
                      <td>{request.customerName}</td>
                      <td>{request.title}</td>
                      <td><span className="badge badge-info">{request.status}</span></td>
                      <td>
                        {request.status === 'New' && (
                           <button className="btn btn-sm btn-success" onClick={() => handleConvertToQuote(request.id)}>
                             Convert to Quote
                           </button>
                        )}
                        <button className="btn btn-sm btn-primary" style={{marginLeft: '5px'}} onClick={() => setEditingRequest(request)}>Edit</button>
                        <button className="btn btn-sm btn-danger" style={{marginLeft: '5px'}} onClick={() => handleDeleteRequest(request.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <AddRequestModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onRequestAdded={handleRequestAdded}
      />
      <EditRequestModal
        request={editingRequest}
        onClose={() => setEditingRequest(null)}
        onRequestUpdated={handleRequestUpdated}
      />
    </>
  );
}

export default RequestsPage;
