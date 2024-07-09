import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddSalary() {


    const navigate=useNavigate();
    const[salaries, setSalaries]=useState({
        type: '',
        status: '',
        basic: '',
        bonus: '',
        leaves: '',
        deduction: ''
    })

    const handleInput=(e)=>{
        e.persist();
        setSalaries({...salaries, [e.target.name]: e.target.value});
    }

    const resetForm = () => {
        setSalaries({
            type: '',
            status: '',
            basic: '',
            bonus: '',
            leaves: '',
            deduction: ''
        });
    };

    

    const saveSalary=(e)=>{
        e.preventDefault();
        const data={
            type: salaries.type,
            status:salaries.status,
            basic: salaries.basic,
            bonus: salaries.bonus,
            leaves: salaries.leaves,
            deduction: salaries.deduction,
        }

        axios.post(`http://127.0.0.1:8000/api/salaries`, data).then(res=>{
            alert("Added successfully..");
            navigate('/Salaries')
        }).catch(error => {
            console.error('Server error occurred:', error);
            if (error.response) {
              console.error('Error status', error.response.status);
              console.error('Error data', error.response.data);
            } else if (error.request) {
              // The request was made but no response was received
              console.error('No response received');
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error('Error', error.message);
            }
            // Optionally inform the user with a message
          });
    }


    return(
    <>
    <Header />
    <Sidebar />
    <PageTitle page="Add Salary" pages={["Salary"]} icon="bi bi-house-up" />
    <main id="main" className="main" style={{ marginTop: "2px" }}>
        <div className="cont mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                        <h4>Add Salary Details
                            <Link to="/Salaries" className="btn btn-danger float-end">Back</Link>
                        </h4>
                        </div>
                        <div className="card-body">
                        <form onSubmit={saveSalary}>
                        <div className="mb-3">
                            <label>Type</label>
                            <input type="text" name="type" value={salaries.type} onChange={handleInput}  className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label>Status</label>
                            <select className="form-select" id="status" name="status" value={salaries.status} onChange={handleInput} required>
                            <option value="">Select Status</option>
                            <option value="permenant">Permenant</option>
                            <option value="temporary">Temporary</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label>Basic Salary</label>
                            <input type="number" name="basic" value={salaries.basic} onChange={handleInput} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label>Bonus</label>
                            <input type="number" name="bonus" value={salaries.bonus} onChange={handleInput} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label>Leaves Allowed</label>
                            <input type="number" name="leaves" value={salaries.leaves} onChange={handleInput} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label>Deduction per Leave</label>
                            <input type="number" name="deduction" value={salaries.deduction} onChange={handleInput} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Save Record</button>
                            <button type="reset" className="btn btn-secondary" onClick={resetForm} style={{ marginLeft: "5px" }}>clear</button>
                        </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    </>
    );
}
export default AddSalary;