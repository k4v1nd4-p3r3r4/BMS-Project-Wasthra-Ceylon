import React, { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

function AddSupplier(props) {
  const [modalShow, setModalShow] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});

  const [supplier, setSuppliers] = useState({
    supplier_id: "",
    supplier_name: "",
    contact_number: "",
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
    setSuppliers({
      ...supplier,
      [e.target.name]: e.target.value,
    });
  };

  const saveSupplier = (e) => {
    e.preventDefault();
    const data = {
      supplier_id: supplier.supplier_id,
      supplier_name: supplier.supplier_name,
      contact_number: supplier.contact_number,
      address: supplier.address,
    };

    axios
      .post("http://127.0.0.1:8000/api/suppliers", data)
      .then((res) => {
        alert(res.data.message);
        setModalShow(false); // Close the modal
        window.location.reload(); // Reload the suppliers page
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
    setSuppliers({
      supplier_id: "",
      supplier_name: "",
      contact_number: "",
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
            Add Supplier
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={saveSupplier}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="supplier_id" className="form-label">
                  Supplier id
                </label>
                <input
                  type="text"
                  name="supplier_id"
                  id="sid"
                  placeholder="Enter supplier id here..(ex: Sxxx)"
                  className="form-control"
                  value={supplier.supplier_id}
                  onChange={handleInput}
                />
                <span className="text-danger">
                  {inputErrorList.supplier_id}
                </span>
              </div>

              <div className="col-md-6">
                <label htmlFor="sname" className="form-label">
                  Supplier Name
                </label>
                <input
                  type="text"
                  name="supplier_name"
                  id="sname"
                  placeholder="Enter name here.."
                  className="form-control"
                  value={supplier.supplier_name}
                  onChange={handleInput}
                />
                <span className="text-danger">
                  {inputErrorList.supplier_name}
                </span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="contact" className="form-label">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contact_number"
                  id="contact"
                  placeholder="Enter contact here.."
                  className="form-control"
                  value={supplier.contact_number}
                  onChange={handleInput}
                />
                <span className="text-danger">
                  {inputErrorList.contact_number}
                </span>
              </div>{" "}
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
                  value={supplier.address}
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

export default AddSupplier;
