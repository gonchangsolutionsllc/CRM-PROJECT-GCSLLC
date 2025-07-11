import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddQuoteModal from '../components/AddQuoteModal';
import EditQuoteModal from '../components/EditQuoteModal';

function QuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState(null);
  const navigate = useNavigate();

  const fetchQuotes = () => {
    fetch('http://localhost:5001/api/quotes')
      .then(res => res.json())
      .then(data => setQuotes(data))
      .catch(err => console.error("Failed to fetch quotes:", err));
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleQuoteAdded = (newQuote) => {
    fetchQuotes(); // Refetch to get the latest list
  };

  const handleQuoteUpdated = (updatedQuote) => {
    setQuotes(currentQuotes =>
      currentQuotes.map(q => (q.id === updatedQuote.id ? updatedQuote : q))
    );
  };

  const handleDeleteQuote = async (quoteId) => {
    if (window.confirm('Are you sure you want to delete this quote?')) {
      try {
        const response = await fetch(`http://localhost:5001/api/quotes/${quoteId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete');
        fetchQuotes(); // Refetch to update list
      } catch (error) {
        console.error("Failed to delete quote:", error);
      }
    }
  };
  
  const handleConvertToJob = async (quoteId) => {
    if (window.confirm('This will convert the quote into a new job. Proceed?')) {
      try {
        const response = await fetch(`http://localhost:5001/api/quotes/${quoteId}/convert-to-job`, {
          method: 'POST',
        });
        if (!response.ok) throw new Error('Failed to convert quote');
        // On success, navigate to the jobs page to see the new job
        navigate('/jobs');
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
            <div className="section-title">📝 Quote Management</div>
            <div className="section-actions">
              <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
                ➕ Create Quote
              </button>
            </div>
          </div>
          <div className="section-content">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map(quote => (
                    <tr key={quote.id}>
                      <td>{quote.customerName}</td>
                      <td>{quote.title}</td>
                      <td>${quote.amount ? quote.amount.toFixed(2) : '0.00'}</td>
                      <td><span className="badge badge-info">{quote.status}</span></td>
                      <td>
                        {quote.status === 'Approved' ? (
                          <button className="btn btn-sm btn-success" onClick={() => handleConvertToJob(quote.id)}>
                            Convert to Job
                          </button>
                        ) : (
                          <>
                            <button className="btn btn-sm btn-primary" onClick={() => setEditingQuote(quote)}>Edit</button>
                            <button className="btn btn-sm btn-danger" style={{marginLeft: '5px'}} onClick={() => handleDeleteQuote(quote.id)}>Delete</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <AddQuoteModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onQuoteAdded={handleQuoteAdded}
      />
      <EditQuoteModal
        quote={editingQuote}
        onClose={() => setEditingQuote(null)}
        onQuoteUpdated={handleQuoteUpdated}
      />
    </>
  );
}

export default QuotesPage;
