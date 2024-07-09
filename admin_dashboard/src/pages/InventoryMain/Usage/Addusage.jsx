import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { fetchMaterialIds } from "../../../components/Apiservices";

function Addusage(props) {
  const [modalShow, setModalShow] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});
  const [materialIds, setMaterialIds] = useState([]); //this is for get material id to dropdown list
  const [usage, setUsage] = useState({
    material_id: "",
    date: "",
    usage_qty: "",
  });

  useEffect(() => {
    fetchMaterialIds(setMaterialIds); // Call fetchMaterialIds and update materialIds state
  }, []);

  const handleShow = () => {
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
  };

  const handleInput = (e) => {
    e.persist();
    setUsage({
      ...usage,
      [e.target.name]: e.target.value,
    });
  };
  const saveUsage = (e) => {
    e.preventDefault();
    const data = {
      material_id: usage.material_id,
      date: usage.date,
      usage_qty: usage.usage_qty,
    };

    axios
      .post("http://127.0.0.1:8000/api/usagematerials", data)
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
    setUsage({
      material_id: "",
      date: "",
      usage_qty: "",
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
            Add Usage
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={saveUsage}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="material_id" className="form-label">
                  Material id
                </label>
                <select
                  name="material_id"
                  id="material_id"
                  className="form-control"
                  value={usage.material_id}
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
                  value={usage.date}
                  onChange={handleInput}
                />
                <span className="text-danger">{inputErrorList.date}</span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="qty" className="form-label">
                  Usage Qty
                </label>
                <input
                  type="text"
                  name="usage_qty"
                  id="qty"
                  placeholder="Enter quantity here.."
                  className="form-control"
                  value={usage.usage_qty}
                  onChange={handleInput}
                />
                <span className="text-danger">{inputErrorList.usage_qty}</span>
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
export default Addusage;
