import CustomFieldsManager from "../components/CustomFieldsManager";

function SettingsPage() {
  return (
    <div className="content-container">
      <h1 className="page-title">Settings</h1>
      <div style={{marginTop: '2rem'}}>
        <CustomFieldsManager />
      </div>
    </div>
  );
}

export default SettingsPage;