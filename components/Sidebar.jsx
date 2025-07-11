import { NavLink } from 'react-router-dom';
import { FiGrid, FiCalendar, FiUsers, FiInbox, FiEdit, FiBriefcase, FiDollarSign, FiUserCheck, FiPlusSquare, FiSettings } from 'react-icons/fi';

function Sidebar() {
    const getNavLinkClass = ({ isActive }) => isActive ? 'nav-item active' : 'nav-item';
    return (
        <nav className="sidebar">
            <div className="sidebar-header">
                <img src="/logo.png" alt="Cleaning Rangers Logo" className="logo-image" />
            </div>
            <div className="nav-menu">
                <button className="nav-item"><div className="nav-icon"><FiPlusSquare /></div><span className="nav-text">Create</span></button>
                <NavLink to="/" className={getNavLinkClass}><div className="nav-icon"><FiGrid /></div><span className="nav-text">Home</span></NavLink>
                <NavLink to="/calendar" className={getNavLinkClass}><div className="nav-icon"><FiCalendar /></div><span className="nav-text">Schedule</span></NavLink>
                <hr className="sidebar-separator" />
                <div className="nav-section-title">Clients</div>
                <NavLink to="/requests" className={getNavLinkClass}><div className="nav-icon"><FiInbox /></div><span className="nav-text">Requests</span></NavLink>
                <NavLink to="/quotes" className={getNavLinkClass}><div className="nav-icon"><FiEdit /></div><span className="nav-text">Quotes</span></NavLink>
                <NavLink to="/customers" className={getNavLinkClass}><div className="nav-icon"><FiUsers /></div><span className="nav-text">All Clients</span></NavLink>
                <NavLink to="/leads" className={getNavLinkClass}><div className="nav-icon">🎯</div><span className="nav-text">Leads</span></NavLink>
                <hr className="sidebar-separator" />
                <div className="nav-section-title">Jobs & Scheduling</div>
                <NavLink to="/jobs" className={getNavLinkClass}><div className="nav-icon"><FiBriefcase /></div><span className="nav-text">All Jobs</span></NavLink>
                <hr className="sidebar-separator" />
                <div className="nav-section-title">Financial</div>
                <NavLink to="/invoices" className={getNavLinkClass}><div className="nav-icon"><FiDollarSign /></div><span className="nav-text">Invoices</span></NavLink>
                <hr className="sidebar-separator" />
                <div className="nav-section-title">Team</div>
                <NavLink to="/contractors" className={getNavLinkClass}><div className="nav-icon"><FiUserCheck /></div><span className="nav-text">Contractors</span></NavLink>
                <hr className="sidebar-separator" />
                <NavLink to="/settings" className={getNavLinkClass}><div className="nav-icon"><FiSettings /></div><span className="nav-text">Settings</span></NavLink>
            </div>
        </nav>
    );
}
export default Sidebar;