import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MakePayment.css";

function MakePayment() {
    const [employeeId, setEmployeeId] = useState("");
    const [employee, setEmployee] = useState(null);
    const [salary, setSalary] = useState(null);
    const [attendance, setAttendance] = useState(null);
    const [leaveDays, setLeaveDays] = useState(null);
    const [paymentsHistory, setPaymentsHistory] = useState([]);

    useEffect(() => {
        fetchEmployeeDetails();
        fetchPaymentsHistory();
    }, [employeeId]);

    const fetchEmployeeDetails = () => {
        axios.get(`/api/employees/${employeeId}`)
            .then(response => {
                setEmployee(response.data);
                return axios.get(`/api/salaries`);
            })
            .then(response => {
                const salaryDetails = response.data.find(s => s.employee_type === employee.jobRole);
                setSalary(salaryDetails);
                return axios.get(`/api/attendance/${employeeId}`);
            })
            .then(response => {
                setAttendance(response.data);
                setLeaveDays(response.data.leaveDays);
            })
            .catch(error => console.error('Error loading data', error));
    };

    const fetchPaymentsHistory = () => {
        axios.get(`/api/payments?employeeId=${employeeId}`)
            .then(response => {
                setPaymentsHistory(response.data);
            })
            .catch(error => console.error('Error loading payments history', error));
    };

    const calculatePay = () => {
        if (!salary || !attendance) return 0;
        const daysWorked = attendance.days;
        const basicPay = daysWorked >= salary.required_days ? salary.basic_salary : 0;
        const bonus = daysWorked >= salary.required_days ? salary.bonus : 0;
        return basicPay + bonus;
    };

    const handleSubmitPayment = () => {
        const paymentAmount = calculatePay();
        const paymentData = {
            employeeId,
            name: employee.name,
            amountPaid: paymentAmount,
            datePaid: new Date().toISOString()
        };
        axios.post('/api/payments', paymentData)
            .then(() => {
                alert('Payment successful');
                fetchPaymentsHistory(); // Refresh payments history after successful payment
            })
            .catch(error => console.error('Payment submission failed', error));
    };

    return(
        <>
            <Header />
            <Sidebar />
            <PageTitle page="Payment Details" pages={["Salary"]} icon="bi bi-house-up" />
            <main id="main" className="main" style={{ marginTop: "2px" }}>
                <div className="cont mt-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Payment Details</h4>
                                    <div className="float-end">
                                        <Link to="/Salaries" className="btn btn-danger">Back</Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div>
                                        <h2 className="h2">Generate Payment</h2>
                                        <div className="form-group">
                                            <label htmlFor="employeeId">Employee ID:</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="employeeId" 
                                                value={employeeId}
                                                onChange={(e) => setEmployeeId(e.target.value)}
                                            />
                                            <button className="btn btn-primary" onClick={fetchEmployeeDetails}>
                                                Search
                                            </button>
                                        </div>
                                        {employee && salary && attendance && leaveDays && (
                                            <div className="payment-details">
                                                <div className="payment-details-item">
                                                    <span className="payment-details-label">Employee Name:</span> {employee.name}
                                                </div>
                                                <div className="payment-details-item">
                                                    <span className="payment-details-label">Job Role:</span> {employee.jobRole}
                                                </div>
                                                <div className="payment-details-item">
                                                    <span className="payment-details-label">Basic Salary:</span> {salary.basic_salary}
                                                </div>
                                                <div className="payment-details-item">
                                                    <span className="payment-details-label">Bonus:</span> {salary.bonus}
                                                </div>
                                                <div className="payment-details-item">
                                                    <span className="payment-details-label">Days Worked:</span> {attendance.days}
                                                </div>
                                                <div className="payment-details-item">
                                                    <span className="payment-details-label">Leave Days (Other than Allowed):</span> {leaveDays}
                                                </div>
                                                <div className="payment-details-item">
                                                    <span className="payment-details-label">Payable Amount:</span>{" "}
                                                    <span className="payment-details-amount">{calculatePay()}</span>
                                                </div>
                                                <button className="btn btn-primary" onClick={handleSubmitPayment}>
                                                    Submit Payment
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-12">
                            <h3>Payments History</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Employee ID</th>
                                        <th>Name</th>
                                        <th>Amount Paid</th>
                                        <th>Date Paid</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentsHistory.map(payment => (
                                        <tr key={payment.id}>
                                            <td>{payment.employeeId}</td>
                                            <td>{payment.name}</td>
                                            <td>{payment.amountPaid}</td>
                                            <td>{new Date(payment.datePaid).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default MakePayment;
