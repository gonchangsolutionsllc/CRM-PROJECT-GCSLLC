// Location: frontend/src/components/TopHeader.jsx

// For now, the page title is static. We'll make it dynamic later.
function TopHeader({ pageTitle = "Dashboard" }) {
  return (
    <header className="top-header">
      <div className="header-left">
        <div>
          <h1 className="page-title">{pageTitle}</h1>
          <div className="breadcrumb">
            <span>Home</span>
            <span>›</span>
            <span>{pageTitle}</span>
          </div>
        </div>
      </div>

      <div className="header-right">
        <div className="search-box">
          <input type="text" className="search-input" placeholder="Search..." />
          <div className="search-icon">🔍</div>
        </div>

        <div className="header-actions">
          <button className="action-btn" title="Notifications">
            🔔
            <span className="badge">5</span>
          </button>
          <button className="action-btn" title="Quick Add">
            ➕
          </button>
        </div>

        <div className="user-menu">
          <div className="user-avatar">PC</div>
          <span>Pablo Chang</span>
          <span>▼</span>
        </div>
      </div>
    </header>
  );
}

export default TopHeader;
