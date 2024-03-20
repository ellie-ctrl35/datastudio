const ReportCreationModal = ({ isOpen, onClose, onSubmit, defaultValues }) => {
    const [serialNumber, setSerialNumber] = useState(defaultValues.serialNumber || '');
    const [remarks, setRemarks] = useState(defaultValues.remarks || '');
  
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Create Report</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ serialNumber, remarks });
          }}>
            <label htmlFor="serialNumber">Device Serial Number:</label>
            <input
              id="serialNumber"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              required
            />
            <label htmlFor="remarks">Engineer's Remarks:</label>
            <textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              required
            />
            <button type="submit">Submit Report</button>
            <button type="button" onClick={onClose}>Close</button>
          </form>
        </div>
      </div>
    );
  };
  