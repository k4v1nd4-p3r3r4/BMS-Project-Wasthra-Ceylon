import React, { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

function AddBuyers(props) {
  const [modalShow, setModalShow] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});

  const [customers, setCustomers] = useState({
    customer_id: "",
    first_name: "",
    last_name: "",
    contact: "",
    address: "",
  });

  const handleShow = () => {
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
  };

  const handleInput = (e) => {
    e.persist();
    setCustomers({
      ...customers,
      [e.target.name]: e.target.value,
    });
  };

  const saveCustomers = (e) => {
    e.preventDefault();
    const data = {
      customer_id: customers.customer_id,
      first_name: customers.first_name,
      last_name: customers.last_name,
      contact: customers.contact,
      address: customers.address,
    };
    axios
      .post("http://127.0.0.1:8000/api/customers", data)
      .then((res) => {
        alert(res.data.message);
        setModalShow(false); // Close the modal
        window.location.reload(); // Reload the customers page
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 422) {
            setInputErrorList(error.response.data.message);
          }
          if (error.response.status === 422) {
            alert(error.response.data);
          }
        }
      });
  };

  const clearForm = () => {
    setCustomers({
      customer_id: "",
      first_name: "",
      last_name: "",
      contact: "",
      address: "",
    });
  };
  return (
    <>
      <button onClick={handleShow} className="btn btn-primary float-end">
        Add new
      </button>

      <Modal
        show={modalShow}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Customer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={saveCustomers}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="customer_id" className="form-label">
                  Customer id
                </label>
                <input
                  type="text"
                  name="customer_id"
                  id="cid"
                  placeholder="Enter customer id here..(ex: Cxxx)"
                  className="form-control"
                  value={customers.customer_id}
                  onChange={handleInput}
                />
                <span className="text-danger">
                  {inputErrorList.customer_id}
                </span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="first_name" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="fname"
                  placeholder="Enter first name here.."
                  className="form-control"
                  value={customers.first_name}
                  onChange={handleInput}
                />
                <span className="text-danger">{inputErrorList.first_name}</span>
              </div>

              <div className="col-md-6">
                <label htmlFor="last_name" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="lname"
                  placeholder="Enter last name here.."
                  className="form-control"
                  value={customers.last_name}
                  onChange={handleInput}
                />
                <span className="text-danger">{inputErrorList.last_name}</span>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="contact" className="form-label">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  placeholder="Enter contact here.."
                  className="form-control"
                  value={customers.contact}
                  onChange={handleInput}
                />
                <span className="text-danger">{inputErrorList.contact}</span>
              </div>

              <div className="col-md-6">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter address here.."
                  className="form-control"
                  value={customers.address}
                  onChange={handleInput}
                />
                <span className="text-danger">{inputErrorList.address}</span>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12 text-end">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  style={{ marginRight: "5px" }}
                  onClick={clearForm}
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ marginRight: "5px" }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default AddBuyers;
