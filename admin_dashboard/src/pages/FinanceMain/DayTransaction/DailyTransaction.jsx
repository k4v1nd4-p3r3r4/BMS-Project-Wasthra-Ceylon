import React, { useEffect, useState } from "react";
import "./dailytransaction.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Link } from "react-router-dom";
import axios from "axios";

function DailyTransaction() {
  const [loading, setLoading] = useState(true);
  const [expences, setExpences] = useState([]);

  
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/expence')
      .then(res => {
        console.log('API response:',res.data);
        // console.log('Expences data:', res.data.expences);
        setExpences(res.data || []); // Ensure expences is always an array
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching expences:', error);
        setExpences([]);
        setLoading(false);
      });
  }, []);





  const handleApprove = (id) => {
    axios.post(`http://127.0.0.1:8000/api/expence/approve/${id}`)
  .then(response => {
    console.log('Expense approved:', response.data);
    setExpences(expences.map(item =>
      item.id === id ? { ...item, status: 'Approved' } : item
    ));
  })
  .catch(error => {
    console.error('Error updating status:', error);
  });
  };

  const handleReject = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/expence/${id}`)
      .then(response => {
        setExpences(expences.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('Error deleting expense:', error);
      });
  };





  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Expences" pages={["Expences "]} icon="bi bi-house-up" />
      <main id="main" className="main" style={{ marginTop: "2px" }}>
        <div className="cont mt-5">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>
                    Expences History
                    <Link to="/dayilytransaction/addExpences" className="btn btn-primary float-end">Add Expences</Link>
                  </h4>
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Transactor</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expences.map((item, index) => (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.date}</td>
                          <td>{item.description}</td>
                          <td>{item.category}</td>
                          <td>{item.transactor}</td>
                          <td>{item.amount}</td>
                          <td>{item.status}</td>
                          <td>
                            <button onClick={() => handleApprove(item.id)} className="btn btn-success">Approve</button>
                            <button onClick={() => handleReject(item.id)} className="btn btn-danger">Reject</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default DailyTransaction;
