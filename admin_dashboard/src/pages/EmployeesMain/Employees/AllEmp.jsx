import React, { useEffect, useState } from "react";
import axios from "axios";

import "./allemp.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";


function AllEmp() {
  const pages = ["All Employees"];
  const icon = "bi bi-house-up";

  const [id,setId] = useState('');
    // const[empid,setEmpid] = useState('');
    const[fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [email,setEmail] = useState('');
    const [nic,setNic] = useState('');
    const [phone,setPhone] = useState('');
    const [address,setAddress] = useState('');
    const [gender,setGender] = useState('');
    const [emptype,setEmptype] = useState('');
    const [employees,setEmployees] = useState([]);
    const [errors, setErrors] = useState({});
    useEffect(()=>{
      (async () => await Load())();
     }, []);

  
     
  async function  Load()
  {
     const result = await axios.get(
         "http://127.0.0.1:8000/api/employee");
         setEmployees(result.data);
         console.log(result.data);
  }


  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // if(!empid.trim()){
    //   errors.empid= "Employee id is required";
    //   isValid = false;
    // }
    if (!fname.trim()) {
      errors.fname= "First Name is required";
      isValid = false;
    }

    if (!lname.trim()) {
      errors.lname = "Last Name is required";
      isValid = false;
    }
    if (!email.trim()) {
          errors.email = "Email is required";
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          errors.email = "Email is invalid";
          isValid = false;
        }
    if (!address.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }

    if (!nic.trim()) {
      errors.nic = "NIC is required";
      isValid = false;
    }else if(!nic.match(/^[0-9]+$/)){
      errors.nic = "NIC is only number required";
    }

    if (!phone.trim()) {
      errors.phone= "Contact Number is required";
      isValid = false;
    } else if(!phone.match(/^[0-9]+$/)){
      errors.phone = "Contact Number must contain only numbers";
      isValid = false;
    }

    if(!gender.trim()){
      errors.gender = "Gender is required";
      isValid = false;
    }

    if(!emptype.trim()){
      errors.AllEmpType = "Employee Type is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const resetForm = () => {
        // setEmpid("");
        setFname("");
        setLname("");
        setEmail("");
        setNic("");
        setPhone("");
        setAddress("");
        setGender("");
        setEmptype("");
        setErrors({});
  };

  async function save(event)
  {
      event.preventDefault();

  if(validateForm()){
  
  try
      {
        
       await axios.post("http://127.0.0.1:8000/api/employee",
      {
        // empid:empid,
        fname:fname,
        lname:lname,
        email:email,
        nic:nic,
        phone:phone,
        address:address,
        gender:gender,
        emptype:emptype

       
      
      });
        alert("Employee registration Registation Successfully");
        setId("");
        // setEmpid("");
        setFname("");
        setLname("");
        setEmail("");
        setNic("");
        setPhone("");
        setAddress("");
        setGender("");
        setEmptype("");
        Load();
      
      }
  catch(err)
      {
        alert("employee Registation Failed");
      }

    }
  
 }


 async function editEmployees(employees)
 {
    // setEmpid(employees.empid);
    setFname(employees.fname);
    setLname(employees.lname);
    setEmail(employees.email);
    setNic(employees.nic);
    setPhone(employees.phone);
    setAddress(employees.address);
    setGender(employees.gender);
    setEmptype(employees.emptype);
    setId(employees.id);
     
 }

 async function DeleteEmployee(id)
 {
     
      await axios.delete("http://127.0.0.1:8000/api/employee/" + id); 
      alert("Employee deleted Successfully");
      Load();
 
 }

 async function update(event)
   {
    event.preventDefault();
    if(validateForm()){
   try
       {
        
        await axios.put("http://127.0.0.1:8000/api/employee/"+ employees.find(u => u.id === id).id || id,
       {
         id: id,
        //  empid:empid,
         fname:fname,
         lname:lname,
         email:email,
         nic:nic,
         phone:phone,
         address:address,
         gender:gender,
         emptype:emptype,
       
       });
         alert("Employee registraton updated");
         setId("");
        //  setEmpid("");
         setFname("");
         setLname("");
         setEmail("");
         setNic("");
         setPhone("");
         setAddress("");
         setGender("");
         setEmptype("");
         
         Load();
       
       }
   catch(err)
       {
         alert("User Registation Failed");
       }
       
      }



   
      }
  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="All Employees" pages={pages} icon={icon} />
      <main id="main" className="main" style={{ marginTop: "10px" }}>
      <div className="container">
    <div className="row">
        <div className="">
            <div class="signup-form">
                <form action="" className="mt-5 border p-4 bg-light shadow">
                    <h4 className="mb-5 text-secondary">Employee Details</h4>
                    <div className="row">
                        {/* <div className="mb-3 col-md-6">
                            <label>Employee Id<span class="text-danger">*</span></label>
                            <input type="text"  className="form-control" placeholder="Enter Employee Id" 
                              value={empid} onChange={(event)=>{setEmpid(event.target.value)}}
                            />
                             {errors.empid && <p className="text-danger">{errors.empid}</p>}
                             
                        </div> */}
                        <div className="mb-3 col-md-6">
                            <label>First Name<span class="text-danger">*</span></label>
                            <input type="text"  className="form-control" placeholder="Enter First Name" id="firstName"
                              value={fname} onChange={(event)=>{setFname(event.target.value)}}
                            />
                             {errors.fname && <p className="text-danger">{errors.fname}</p>}
                             
                        </div>

                        <div class="mb-3 col-md-6">
                            <label>Last Name<span class="text-danger">*</span></label>
                            <input type="text"  class="form-control" placeholder="Enter Last Name" id="lastname"
                            value={lname} onChange={(event)=>{setLname(event.target.value)}}
                            />
                             {errors.lname && <p className="text-danger">{errors.lname}</p>}
                        </div>
                        <div class="mb-3 col-md-6">
                            <label>E mail<span class="text-danger">*</span></label>
                            <input type="text"  class="form-control" placeholder="Enter Email"
                            value={email} onChange={(event)=>{setEmail(event.target.value)}}
                            />
                             {errors.email && <p className="text-danger">{errors.email}</p>}
                        </div>

                        <div class="mb-3 col-md-6">
                            <label>NIC<span className="text-danger">*</span></label>
                            <input type="text"  className="form-control" placeholder="Enter NIC" id="nic"
                            value={nic} onChange={(event)=>{setNic(event.target.value)}}
                            />
                             {errors.nic && <p className="text-danger">{errors.nic}</p>}

                        </div>

                        <div class="mb-3 col-md-6">
                            <label>Contact Number<span class="text-danger">*</span></label>
                            <input type="text" className="form-control" placeholder="Enter contact number"
                            value={phone} onChange={(event)=>{setPhone(event.target.value)}}
                            />
                           
                             {errors.phone && <p className="text-danger">{errors.phone}</p>}
                          
                        </div>

                        <div class="mb-3 col-md-6">
                            <label>Address<span className="text-danger">*</span></label>
                            <input type="text" name="address" class="form-control" placeholder="Enter Address"
                            value={address} onChange={(event)=>{setAddress(event.target.value)}}
                            />
                            {errors.address && <p className="text-danger">{errors.address}</p>}
                        </div>
                        <div class="mb-3 col-md-6">
                        <label>Genger<span class="text-danger">*</span></label>
                        <select name="gender" className="form-control" 
                            value={gender} onChange={(event)=>{setGender(event.target.value)}}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            
                        </select>
                        {errors.gender && <p className="text-danger">{errors.gender}</p>}
                        </div>
                        <div class="mb-3 col-md-6">
                        <label>Employee type<span className="text-danger">*</span></label>
                        <select
                            name="employeetype"
                            className="form-control"
                            value={emptype}
                            onChange={(event) => { setEmptype(event.target.value) }}
                        >
                            <option value="">Select Employee type</option>
                            <option value="Manager">Manager</option>
                            <option value="Worker">Worker</option>
                            <option value="Accountan">Accountan</option>
                        </select>
                        {errors.gender && <p className="text-danger">{errors.gender}</p>}
                        </div>

                        <div class="col-md-12">
                           <button className="btn btn-success float-end" style={{marginRight:"10px"}} onClick={save}>Save</button>
                           <button className="btn btn-warning float-end" style={{marginRight:"10px"}} onClick={update}>Update</button>
                           <button className="btn btn-secondary float-end" style={{marginRight:"10px"}} onClick={resetForm}>Reset</button>
                        </div>
                    </div>
                </form>
                <br />
            </div>
        </div>
        <br />
        <div className="container p-6 ">
        <div className="scrollable">
        <div className="table-responsive">
          
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">id</th>
                {/* <th scope="col">Employee Id</th> */}
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">NIC</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
                <th scope="col">Gender</th>
                <th scope="col">Position</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {employees.map(function fn(employee)
       {
            return(
            <tbody>
                <tr>
                <th scope="row">{employee.id} </th>
                {/* <td>{employee.empid}</td> */}
                <td>{employee.fname}</td>
                <td>{employee.lname}</td>
                <td>{employee.email}</td>
                <td>{employee.nic}</td>
                <td>{employee.phone}</td>
                <td>{employee.address}</td>
                <td>{employee.gender}</td>
                <td>{employee.emptype}</td>      
                <td>
                    <div className="d-flex">
                    <button type="button" class="btn btn-warning" style={{marginRight:"10px"}} onClick={() => editEmployees(employee)} ><i class="bi bi-pencil"> </i>Edit</button>  
                    <button type="button" class="btn btn-danger" style={{marginRight:"10px"}} onClick={() => DeleteEmployee(employee.id)}>  <i class="bi bi-trash"> </i>Delete</button>
                    </div>
                </td>
                </tr>
            </tbody>
            );
            })}
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

export default AllEmp;
