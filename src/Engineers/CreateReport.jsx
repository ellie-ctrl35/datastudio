import { useContext, useState,useEffect } from "react";
import "./Engineer.css";
import { Link } from "react-router-dom";
import Logo from "../resources/Studio.png";
import Avatar from "react-avatar";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const ReportCreationModal = ({ isOpen, onClose, onSubmit, defaultValues = {} }) => {
  const [engineer, setEngineer] = useState('');
  const [facilityName, setFacilityName] = useState('');
  const [equipmentName, setEquipmentName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [modelNumber, setModelNumber] = useState('');
  const [problemDesc, setProblemDesc] = useState('');
  const [workDone, setWorkDone] = useState('');
  const [furtherWorks, setFurtherWorks] = useState('false');
  const [furtherWorkDesc, setFurtherWorkDesc] = useState('');
  const [reportType, setReportType] = useState('');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Report</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit({
            Engineer: engineer,
            FacilityName: facilityName,
            EquipmentName: equipmentName,
            SerialNumber: serialNumber,
            modelNumber: modelNumber,
            ProblemDesc: problemDesc,
            WorkDone: workDone,
            FurtherWorks: furtherWorks,
            FurtherWorkDesc: furtherWorkDesc,
            type: reportType,
          });
        }}>
          {/* Add form inputs here, matching the schema fields */}
          <input value={engineer} onChange={(e) => setEngineer(e.target.value)} placeholder="Engineer" required />
          <input value={facilityName} onChange={(e) => setFacilityName(e.target.value)} placeholder="Facility Name" />
          <input value={equipmentName} onChange={(e) => setEquipmentName(e.target.value)} placeholder="Equipment Name" required />
          <input value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} placeholder="Serial Number" />
          <input value={modelNumber} onChange={(e) => setModelNumber(e.target.value)} placeholder="Model Number" />
          <textarea value={problemDesc} onChange={(e) => setProblemDesc(e.target.value)} placeholder="Problem Description" />
          <textarea value={workDone} onChange={(e) => setWorkDone(e.target.value)} placeholder="Work Done" />
          <select value={furtherWorks} onChange={(e) => setFurtherWorks(e.target.value)}>
            <option value="false">No Further Works</option>
            <option value="true">Further Works Required</option>
          </select>
          <textarea value={furtherWorkDesc} onChange={(e) => setFurtherWorkDesc(e.target.value)} placeholder="Further Work Description" />
          <select value={reportType} onChange={(e) => setReportType(e.target.value)} required>
            <option value="">Select Report Type</option>
            <option value="CMReport">CMReport</option>
            <option value="PMReport">PMReport</option>
            <option value="PPMReport">PPMReport</option>
            <option value="regular">Regular</option>
          </select>
          {/* Submit and Close buttons */}
          <button type="submit">Submit Report</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};



const CreateReport = () => {
  const { userInfo,logout } = useContext(AuthContext);
  const name = userInfo.username;
  const [assignedRequest,setAssignedRequest] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleReportSubmit = (reportDetails) => {
    console.log("Report Details: ", reportDetails);
    // Here you would typically make an API call to submit these details
    setIsModalOpen(false); // Close modal after submit
  };

  useEffect(() => {
    // Ensure that 'name' is encoded properly in case of special characters.
    const encodedName = encodeURIComponent(name);
  
    axios.get(`http://localhost:8080/getassignedrequest?name=${encodedName}`)
      .then((res) => {
        console.log(res.data); // Now you can use res.data to display the reports
        setAssignedRequest(res.data.data);
        console.log("assigned Request",assignedRequest)
      })
      .catch((error) => {
        console.error("Failed to fetch assigned requests:", error);
      });
  }, [name]); // Depend on 'name' to re-fetch if it changes
  
  
  return (
    <div className="App">
      <div className="the-navbar">
        <div className="logo-cont">
          <img src={Logo} alt="Studio" />
          <h1>Data Studio</h1>
        </div>
        <div className="navlinks-cont2">
          <Link className="navlink" to="/engineers/create-report">
            Create Report
          </Link>
          <Link className="navlink" to="engineers/report-history">
            Reports History
          </Link>
          <button className="navlink" onClick={()=>logout()}>Logout</button>
          <Avatar round name={name} size={40} />
        </div>
      </div>
      <div className="bottom-half">
        <div className="head">
          <p>Request ID</p>
          <p>Request Type</p>
          <p>Client</p>
        </div>
        <ul className="request-list">
          {assignedRequest.map((request) => (
            <li className="thelist" key={request._id}>
              <p>{request._id}</p>
              <p>{request.type}</p>
              <p>{request.author}</p>
              <button className="createbtn" onClick={() => {
              setSelectedNotification(request);
              setIsModalOpen(true);
            }}>Create Report</button>
            </li>
          ))}
        </ul>
      </div>
      <ReportCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReportSubmit}
        defaultValues={selectedNotification || {}}
      />
    </div>
  );
};

export default CreateReport;
