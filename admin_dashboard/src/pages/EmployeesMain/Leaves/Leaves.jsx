import React, { useEffect, useState } from "react";
import "./leaves.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
import axios from "axios";

function Leaves() {
  const pages = ["Leaves"];
  const icon = "bi bi-house-up";

  const [id, setId] = useState('');
  const [empid, setEmpid] = useState('');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('');
  const [leaves, setLeaves] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    (async () => await Load())();
  }, []);

  // Load the leaves data
  async function Load() {
    try {
      const result = await axios.get("http://localhost:8000/api/leaves");
      setLeaves(result.data);
      console.log(result.data);
    } catch (err) {
      console.error("Error loading leaves data:", err);
      alert("Failed to load leaves data");
    }
  }

  // Validate the form
  function validate() {
    const errors = {};
    if (!empid) errors.empid = "Employee ID is required";
    if (!date) errors.date = "Date is required";
    if (!reason) errors.reason = "Reason is required";
    if (!status) errors.status = "Status is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  // Save the leaves data
  async function save(event) {
    event.preventDefault();
    if (!validate()) return;
    try {
      await axios.post("http://127.0.0.1:8000/api/leaves", {
        empid: empid,
        date: date,
        reason: reason,
        status: status,
      });
      alert("Leaves Saved!");
      setEmpid('');
      setDate('');
      setReason('');
      setStatus('');
      Load();
    } catch (err) {
      console.error("Error saving leave:", err);
      alert("Leaves Save Failed!");
    }
  }

  async function editLeaves(leave) {
    setEmpid(leave.empid);
    setDate(leave.date);
    setReason(leave.reason);
    setStatus(leave.status);
    setId(leave.id);
  }

  async function DeleteLeave(id) {
    try {
      await axios.delete("http://127.0.0.1:8000/api/leaves/" + id);
      alert("Leave deleted Successfully");
      Load();
    } catch (err) {
      console.error("Error deleting leave:", err);
      alert("Leave deletion Failed!");
    }
  }

  async function update(event) {
    event.preventDefault();
    if (!validate()) return;
    try {
      await axios.put("http://127.0.0.1:8000/api/leaves/" + id, {
        id: id,
        empid: empid,
        date: date,
        reason: reason,
        status: status,
      });
      alert("Leave Details Updated!");
      setId("");
      setEmpid("");
      setDate("");
      setReason("");
      setStatus("");
      Load();
    } catch (err) {
      console.error("Error updating leave:", err);
      alert("Leave details update Failed!");
    }
  }

  function resetForm() {
    setId("");
    setEmpid("");
    setDate("");
    setReason("");
    setStatus("");
    setErrors({});
  }

  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Leave Management" pages={pages} icon={icon} />
      <main id="main" className="main">
        <div className="container">
          <div className="row">
            <div className="">
              <div className="signup-form">
                <form action="" className="mt-5 border p-4 bg-light shadow">
                  <h4 className="mb-5 text-secondary">Leave Management</h4>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label>Employee ID<span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Employee ID"
                        value={empid}
                        onChange={(event) => {
                          setEmpid(event.target.value);
                        }}
                      />
                      {errors.empid && <div className="text-danger">{errors.empid}</div>}
                    </div>
                    <div className="mb-3 col-md-6">
                      <label>Date<span className="text-danger">*</span></label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Select Date"
                        value={date}
                        onChange={(event) => {
                          setDate(event.target.value);
                        }}
                      />
                      {errors.date && <div className="text-danger">{errors.date}</div>}
                    </div>
                    <div className="mb-3 col-md-6">
                      <label>Reason<span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="fname"
                        className="form-control"
                        placeholder="Enter Reason"
                        value={reason}
                        onChange={(event) => {
                          setReason(event.target.value);
                        }}
                      />
                      {errors.reason && <div className="text-danger">{errors.reason}</div>}
                    </div>
                    <div className="mb-3 col-md-6">
                      <label>Status<span className="text-danger">*</span></label>
                      <select
                        name="Status"
                        className="form-control"
                        value={status}
                        onChange={(event) => {
                          setStatus(event.target.value);
                        }}
                      >
                        <option value="">Select Status</option>
                        <option value="Accept">Accept</option>
                        <option value="Reject">Reject</option>
                      </select>
                      {errors.status && <div className="text-danger">{errors.status}</div>}
                    </div>
                    <div className="col-md-12">
                      <button
                        className="btn btn-primary float-end"
                        style={{ marginRight: "10px" }}
                        onClick={save}
                        disabled={!empid || !date || !reason || !status}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-primary float-end"
                        style={{ marginRight: "10px" }}
                        onClick={update}
                        disabled={!id}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-primary float-end"
                        style={{ marginRight: "10px" }}
                        onClick={resetForm}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="table-responsive">
          <div className="scrollable">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Leave ID</th>
                  <th scope="col">Employee Id</th>
                  <th scope="col">Date</th>
                  <th scope="col">Reason</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              {leaves.map((leave) => (
                <tbody key={leave.id}>
                  <tr>
                    <th scope="row">{leave.id}</th>
                    <td>{leave.empid}</td>
                    <td>{leave.date}</td>
                    <td>{leave.reason}</td>
                    <td>{leave.status}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => editLeaves(leave)}
                        style={{ marginRight: "10px" }}
                      >
                        <i className="bi bi-pencil"></i> Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => DeleteLeave(leave.id)}
                        style={{ marginRight: "10px" }}
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

export default Leaves;
