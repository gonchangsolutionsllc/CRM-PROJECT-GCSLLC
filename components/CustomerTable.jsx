// Location: frontend/src/components/CustomerTable.jsx

// We are now receiving an onEdit function as a prop
function CustomerTable({ customers, onDelete, onEdit }) {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Contact Info</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td><strong>{customer.fullName}</strong></td>
              <td>{customer.email}<br />{customer.phone}</td>
              <td><span className="badge badge-success">Active</span></td>
              <td>
                <button className="btn btn-sm btn-secondary">View</button>
                {/* UPDATED EDIT BUTTON */}
                <button className="btn btn-sm btn-primary" style={{ margin: '0 5px' }} onClick={() => onEdit(customer)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(customer.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;
