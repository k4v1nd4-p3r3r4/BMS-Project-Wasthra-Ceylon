import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditSalary() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [salary, setSalary] = useState({
        type: '',
        status: '',
        basic: '',
        bonus: '',
        leaves: '',
        deduction: ''
    });

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/salaries/${id}`)
            .then(res => {
                console.log('API Response:', res.data); // Log API response for debugging
                if (res.data) {
                    setSalary(res.data);
                    setLoading(false);
                } else {
                    console.error('Salary data not found');
                }
            })
            .catch(error => {
                console.error('Error fetching:', error);
                setLoading(false);
            });
    }, [id]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setSalary({ ...salary, [name]: value });
    };

    const updateSalary = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/salaries/${id}`, salary)
            .then(res => {
                console.log('Updated successfully:', res.data);
                alert("Updated successfully..");
                navigate('/salaries');
            })
            .catch(error => {
                console.error('Error updating:', error);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <Sidebar />
            <PageTitle page="Edit Salary" pages={["Salary"]} icon="bi bi-house-up" />
            <main id="main" className="main" style={{ marginTop: "2px" }}>
                <div className="cont mt-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Edit Salary Details
                                        <Link to="/salaries" className="btn btn-danger float-end">Back</Link>
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={updateSalary}>
                                        <div className="mb-3">
                                            <label>Type</label>
                                            <input
                                                type="text"
                                                name="type"
                                                value={salary.type}
                                                onChange={handleInput}
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>Status</label>
                                            <select
                                                className="form-select"
                                                id="status"
                                                name="status"
                                                value={salary.status}
                                                onChange={handleInput}
                                                required
                                            >
                                                <option value="">Select Status</option>
                                                <option value="permanent">Permanent</option>
                                                <option value="temporary">Temporary</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label>Basic Salary</label>
                                            <input
                                                type="number"
                                                name="basic"
                                                value={salary.basic}
                                                onChange={handleInput}
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>Bonus</label>
                                            <input
                                                type="number"
                                                name="bonus"
                                                value={salary.bonus}
                                                onChange={handleInput}
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>Leaves Allowed</label>
                                            <input
                                                type="number"
                                                name="leaves"
                                                value={salary.leaves}
                                                onChange={handleInput}
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>Deduction per Leave</label>
                                            <input
                                                type="number"
                                                name="deduction"
                                                value={salary.deduction}
                                                onChange={handleInput}
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <button type="submit" className="btn btn-primary">Update Record</button>
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

export default EditSalary;
