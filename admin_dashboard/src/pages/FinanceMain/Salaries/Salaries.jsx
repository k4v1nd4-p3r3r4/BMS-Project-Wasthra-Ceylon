import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Salaries() {

    const [loading, setLoading] = useState(true);
    const [salaries, setSalaries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/salaries')
            .then(res => {
                console.log('API response:', res.data);
                setSalaries(res.data || []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching:', error);
                setSalaries([]);
                setLoading(false);
            });
    }, []);

    const deleteSalary = (id) => {
        if (window.confirm('Are you sure you want to delete this salary?')) {
            axios.delete(`http://127.0.0.1:8000/api/salaries/${id}`)
                .then(res => {
                    alert('Deleted successfully');
                    setSalaries(salaries.filter(salary => salary.id !== id));
                })
                .catch(error => {
                    console.error('Error deleting:', error);
                });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <Sidebar />
            <PageTitle page="Salary Details" pages={["Salary"]} icon="bi bi-house-up" />
            <main id="main" className="main" style={{ marginTop: "2px" }}>
                <Link to="/salaries/pay" className="btn btn-light btn-lg">Payments</Link>
                <div className="cont mt-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Salary Details
                                        <Link to="/salaries/addSalary" className="btn btn-primary float-end">Add New</Link>
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Type</th>
                                                <th>Status</th>
                                                <th>Basic Salary</th>
                                                <th>Bonus</th>
                                                <th>Leaves Allowed</th>
                                                <th>Deduction per Leave</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {salaries.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.id}</td>
                                                    <td>{item.type}</td>
                                                    <td>{item.status}</td>
                                                    <td>{item.basic}</td>
                                                    <td>{item.bonus}</td>
                                                    <td>{item.leaves}</td>
                                                    <td>{item.deduction}</td>
                                                    <td>
                                                        <Link to={`/salaries/edit/${item.id}`} className="btn btn-success">Edit</Link>
                                                        <button onClick={() => deleteSalary(item.id)} className="btn btn-danger">Delete</button>
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

export default Salaries;
