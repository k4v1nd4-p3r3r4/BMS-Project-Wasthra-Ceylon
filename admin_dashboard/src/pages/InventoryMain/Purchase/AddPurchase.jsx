import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import {
  fetchMaterialIds,
  fetchSupplierIds,
} from "../../../components/Apiservices";

import "./addpurchase.css";

function AddPurchase(props) {
  const [modalShow, setModalShow] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});
  const [materialIds, setMaterialIds] = useState([]); //this is for get material id to dropdown list
  const [supplierIds, setSupplierIds] = useState([]);
  const [purchase, setPurchase] = useState({
    material_id: "",
    supplier_id: "",
    date: "",
    qty: "",
    unit_price: "",
  });

  useEffect(() => {
    fetchMaterialIds(setMaterialIds); // Call fetchMaterialIds and update materialIds state
    fetchSupplierIds(setSupplierIds); // Call fetchSupplierIds and update supplierIds state
  }, []);

  const handleShow = () => {
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
  };

  const handleInput = (e) => {
    e.persist();
    setPurchase({
      ...purchase,
      [e.target.name]: e.target.value,
    });
  };
  const savePurchase = (e) => {
    e.preventDefault();
    const data = {
      material_id: purchase.material_id,
      supplier_id: purchase.supplier_id,
      date: purchase.date,
      qty: purchase.qty,
      unit_price: purchase.unit_price,
    };

    axios
      .post("http://127.0.0.1:8000/api/purchaseMaterial", data)
      .then((res) => {
        alert(res.data.message);
        setModalShow(false); // Close the modal
        window.location.reload(); // Reload the materials page
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
    setPurchase({
      material_id: "",
      supplier_id: "",
      date: "",
      qty: "",
      unit_price: "",
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
            Add Purchase
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={savePurchase}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="material_id" className="form-label">
                  Material id
                </label>

                <select
                  name="material_id"
                  id="material_id"
                  className="form-control"
                  value={purchase.material_id}
                  onChange={handleInput}
                >
                  <option value="">Select Material ID</option>
                  {materialIds.map((materialId) => (
                    <option key={materialId} value={materialId}>
                      {materialId}
                    </option>
                  ))}
                </select>
                <span className="text-danger">
                  {inputErrorList.material_id}
                </span>
              </div>

              <div className="col-md-6">
                <label htmlFor="supplier_id" className="form-label">
                  Supplier id
                </label>
                <select
                  name="supplier_id"
                  id="supplier_id"
                  className="form-control"
                  value={purchase.supplier_id}
                  onChange={handleInput}
                >
                  <option value="">Select Supplier ID</option>
                  {supplierIds.map((supplierId) => (
                    <option key={supplierId} value={supplierId}>
                      {supplierId}
                    </option>
                  ))}
                </select>
                <span className="text-danger">
                  {inputErrorList.supplier_id}
                </span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="qty" className="form-label">
                  Qty
                </label>
                <input
                  type="text"
                  name="qty"
                  id="qty"
                  placeholder="Enter quantity here.."
                  className="form-control"
                  value={purchase.qty}
                  onChange={handleInput}
                />
                <span className="text-danger">{inputErrorList.qty}</span>
              </div>

              <div className="col-md-6">
                <label htmlFor="unit_price" className="form-label">
                  Unit price
                </label>
                <input
                  type="text"
                  name="unit_price"
                  id="unit_price"
                  placeholder="Enter unit price here.."
                  className="form-control"
                  value={purchase.unit_price}
                  onChange={handleInput}
                />
                <span className="text-danger">{inputErrorList.unit_price}</span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="form-control"
                  value={purchase.date}
                  onChange={handleInput}
                />
                <span className="text-danger">{inputErrorList.date}</span>
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

export default AddPurchase;
