import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { useState } from "react";
import axios from "axios";

function Addexpence(){

    const navigate=useNavigate();
    const[expence, setExpence]=useState({
        date: '',
        description: '',
        category: '',
        transactor: '',
        amount: '',
        status: ''
    })

    const handleInput=(e)=>{
        e.persist();
        setExpence({...expence, [e.target.name]: e.target.value});
    }

    const resetForm = () => {
        setExpence({
            date: '',
            description: '',
            category: '',
            transactor: '',
            amount: '',
            status: ''
        });
    };

    

    const saveExpence=(e)=>{
        e.preventDefault();
        const data={
            date: expence.date,
            description: expence.description,
            category: expence.category,
            transactor: expence.transactor,
            amount: expence.amount,
            status: expence.status,
        }

        axios.post(`http://127.0.0.1:8000/api/expence`, data).then(res=>{
            alert("Added successfully..");
            navigate('/dayilytransaction')
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
    <PageTitle page="Add Expences" pages={["Expences "]} icon="bi bi-house-up" />
    <main id="main" className="main" style={{ marginTop: "2px" }} >
    <div className="cont mt-5">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>
                    Expences History
                    <Link to="/dayilytransaction" className="btn btn-danger float-end">Back</Link>
                  </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={saveExpence}>
                        <div className="mb-3">
                            <label>Date</label>
                            <input type="date" name="date" value={expence.date} onChange={handleInput} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label>Description</label>
                            <input type="text" name="description" value={expence.description} onChange={handleInput} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label>Category</label>
                            <select className="form-select" id="category" name="category" value={expence.category} onChange={handleInput} required>
                            <option value="">Select Category</option>
                            <option value="Fuel">Fuel</option>
                            <option value="Meal">Meal</option>
                            <option value="Bill">Bill</option>
                            <option value="Maintenance">Maintenance</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label>Transactor</label>
                            <input type="text" name="transactor" value={expence.transactor} onChange={handleInput}  className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label>Amount</label>
                            <input type="number" name="amount" value={expence.amount} onChange={handleInput} className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label>Status</label>
                            <select className="form-select" id="status" name="status" value={expence.status} onChange={handleInput} required>
                            <option value="">Select Status</option>
                            <option value="Pending">Pending</option>
                            </select>
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
    )
}

export default Addexpence;