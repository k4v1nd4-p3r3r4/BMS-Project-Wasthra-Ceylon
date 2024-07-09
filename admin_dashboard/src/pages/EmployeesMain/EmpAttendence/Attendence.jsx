import React, { useEffect, useState } from 'react';
import "./attendence.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
import axios from 'axios';

// function Attendence() {
//   const pages = ["Attendence"];
//   const icon = "bi bi-house-up";
//   return (
//     <>
//       <Header />
//       <Sidebar />
//       <PageTitle page="Attendence" pages={pages} icon={icon} />
//       <main id="main" className="main">
//         Attendence
//       </main>
//     </>
//   );
// }

// export default Attendence;
const Attendance = () => {
  const pages = ["Attendence"];
  const icon = "bi bi-house-up";
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empid, setEmpid] = useState('');
  const [date, setDate] = useState('');
  const [filteredAttendances, setFilteredAttendances] = useState([]);


  useEffect(() => {
    loadAttendances();
  }, []);

  useEffect(() => {
    filterAttendances();
  }, [empid, date, attendances]);

  const loadAttendances = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/attendances');
      setAttendances(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading attendances:', error);
    }
  };

  const clockIn = async () => {
    try {
      await axios.post('http://localhost:8000/api/attendances/clock-in', { empid });
      loadAttendances();
    } catch (error) {
      console.error('Error clocking in:', error);
    }
  };

  const clockOut = async () => {
    try {
      await axios.post('http://localhost:8000/api/attendances/clock-out', { empid });
      loadAttendances();
    } catch (error) {
      console.error('Error clocking out:', error);
    }
  };

  const filterAttendances = () => {
    let filtered = attendances;
    if (empid) {
      filtered = filtered.filter(att => att.empid === empid);
    }
    if (date) {
      filtered = filtered.filter(att => new Date(att.clock_in).toLocaleDateString() === new Date(date).toLocaleDateString());
    }
    setFilteredAttendances(filtered);
  };

  const clearEmpid = () => {
    setEmpid('');
  };

 



  return (
<>
<Header />
     <Sidebar />
     <PageTitle page="Attendence" pages={pages} icon={icon} />
     <main id="main" className="main">
     <div className="container mt-4">
     
      <div className="mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Enter Employee ID" 
          value={empid} 
          onChange={(e) => setEmpid(e.target.value)} 
        />
        <button className="btn btn-secondary mt-2" onClick={clearEmpid}>Clear</button>
      </div>
      <div className="mb-3">
        <input 
          type="date" 
          className="form-control" 
          placeholder="Select Date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
      </div>
      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={clockIn}>Clock In</button>
        <button className="btn btn-secondary" onClick={clockOut}>Clock Out</button>
      </div>
      <div className="scrollable">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Clock In</th>
            <th>Clock Out</th>
            <th>Work Hours</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendances.map(att => (
            <tr key={att.id}>
              <td>{att.empid}</td>
              <td>{new Date(att.clock_in).toLocaleDateString()}</td>
              <td>{att.clock_in ? new Date(att.clock_in).toLocaleTimeString() : 'N/A'}</td>
              <td>{att.clock_out ? new Date(att.clock_out).toLocaleTimeString() : 'N/A'}</td>
              <td>
                {att.clock_in && att.clock_out
                  ? ((new Date(att.clock_out) - new Date(att.clock_in)) / 3600000).toFixed(2) + ' hours'
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

    </main>
  </>
  );
};

export default Attendance;
