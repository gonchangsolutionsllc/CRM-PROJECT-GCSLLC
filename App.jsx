import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import CalendarPage from './pages/CalendarPage';
import CustomersPage from './pages/CustomersPage';
import RequestsPage from './pages/RequestsPage';
import QuotesPage from './pages/QuotesPage';
import JobsPage from './pages/JobsPage';
import InvoicesPage from './pages/InvoicesPage';
import LeadsPage from './pages/LeadsPage';
import ContractorsPage from './pages/ContractorsPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/quotes" element={<QuotesPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/contractors" element={<ContractorsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Layout>
  );
}
export default App;
