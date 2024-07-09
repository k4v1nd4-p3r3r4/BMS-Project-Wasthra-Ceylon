import React, { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

function Addhandlist() {
  const [modalShow, setModalShow] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});

  const [handlist, setHandlist] = useState({
    item_id: "",
    item_name: "",
    unit: "",
  });

  const handleShow = () => {
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
  };

  const handleInput = (e) => {
    e.persist();
    setHandlist({
      ...handlist,
      [e.target.name]: e.target.value,
    });
  };

  const saveHandlist = (e) => {
    e.preventDefault();
    const data = {
      item_id: handlist.item_id,
      item_name: handlist.item_name,
      unit: handlist.unit,
    };

    axios
      .post("http://127.0.0.1:8000/api/handlist", data)
      .then((res) => {
        alert(res.data.message);
        setModalShow(false); // Close the modal
        window.location.reload(); // Reload the  page
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
    setHandlist({
      item_id: "",
      item_name: "",
      unit: "",
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
            Add Handcraft List
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={saveHandlist}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="food_id" className="form-label">
                  Item id
                </label>
                <input
                  type="text"
                  name="item_id"
                  id="itid"
                  placeholder="Enter Food id here..(ex: Hxxx)"
                  className="form-control"
                  value={handlist.item_id}
                  onChange={handleInput}
                />
                <span className="text-danger">{inputErrorList.item_id}</span>
              </div>

              <div className="col-md-6">
                <label htmlFor="food_name" className="form-label">
                  Item Name
                </label>
                <input
                  type="text"
                  name="item_name"
                  id="iname"
                  placeholder="Enter food name here.."
                  className="form-control"
                  value={handlist.item_name}
                  onChange={handleInput}
                />
                <span className="text-danger">{inputErrorList.item_name}</span>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="unit" className="form-label">
                  Unit of measure
                </label>
                <select
                  name="unit"
                  id="unit"
                  className="form-control"
                  value={handlist.unit}
                  onChange={handleInput}
                >
                  <option value="">Select Unit</option>
                  <option value="Kg">Kg</option>
                  <option value="Pieces">Pieces</option>
                </select>
                <span className="text-danger">{inputErrorList.unit}</span>
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

export default Addhandlist;
