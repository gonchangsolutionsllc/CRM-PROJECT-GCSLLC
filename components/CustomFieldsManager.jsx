import { useState, useEffect } from 'react';

function CustomFieldsManager() {
  const [definitions, setDefinitions] = useState([]);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState('Text');

  const fetchDefinitions = () => {
    fetch('http://localhost:5001/api/custom-fields/definitions?applies_to=Customer')
      .then(res => res.json())
      .then(data => setDefinitions(data))
      .catch(err => console.error("Failed to fetch definitions:", err));
  };

  useEffect(() => {
    fetchDefinitions();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fieldData = { name: newFieldName, field_type: newFieldType, applies_to: 'Customer' };
    try {
      const response = await fetch('http://localhost:5001/api/custom-fields/definitions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fieldData),
      });
      if (!response.ok) throw new Error('Failed to create field');
      fetchDefinitions(); // Refetch the list to show the new field
      setNewFieldName(''); // Clear the input
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="content-section">
      <div className="section-header">
        <div className="section-title">Manage Custom Fields</div>
      </div>
      <div className="section-content">
        {/* Form for adding new fields */}
        <form onSubmit={handleSubmit} className="form-grid" style={{ marginBottom: '2rem', alignItems: 'flex-end' }}>
          <div className="form-group">
            <label className="form-label">New Field Name</label>
            <input
              type="text"
              className="form-control"
              value={newFieldName}
              onChange={e => setNewFieldName(e.target.value)}
              placeholder="e.g., Gate Code"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Field Type</label>
            <select className="form-control" value={newFieldType} onChange={e => setNewFieldType(e.target.value)}>
              <option value="Text">Text</option>
              <option value="Number">Number</option>
              <option value="Date">Date</option>
            </select>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Add Field</button>
          </div>
        </form>

        {/* List of existing fields */}
        <h4>Existing Customer Fields</h4>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
          {definitions.map(def => (
            <li key={def.id} style={{ background: 'var(--background)', padding: '8px 12px', borderRadius: '4px', marginBottom: '8px' }}>
              {def.name} ({def.field_type})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CustomFieldsManager;