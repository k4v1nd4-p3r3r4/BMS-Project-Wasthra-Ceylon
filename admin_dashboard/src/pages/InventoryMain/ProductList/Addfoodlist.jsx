import React, { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

function Addfoodlist() {
  const [modalShow, setModalShow] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});

  const [foodlist, setFoodlist] = useState({
    food_id: "",
    food_name: "",
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
    setFoodlist({
      ...foodlist,
      [e.target.name]: e.target.value,
    });
  };

  const saveFoodlist = (e) => {
    e.preventDefault();
    const data = {
      food_id: foodlist.food_id,
      food_name: foodlist.food_name,
      unit: foodlist.unit,
    };

    axios
      .post("http://127.0.0.1:8000/api/foodlist", data)
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
    setFoodlist({
      food_id: "",
      food_name: "",
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
            Add Foodlist
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={saveFoodlist}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="food_id" className="form-label">
                  Food id
                </label>
                <input
                  type="text"
                  name="food_id"
                  id="fid"
                  placeholder="Enter Food id here..(ex: Fxxx)"
                  className="form-control"
                  value={foodlist.food_id}
                  onChange={handleInput}
                />
                <span className="text-danger">{inputErrorList.food_id}</span>
              </div>

              <div className="col-md-6">
                <label htmlFor="food_name" className="form-label">
                  Food Name
                </label>
                <input
                  type="text"
                  name="food_name"
                  id="faname"
                  placeholder="Enter food name here.."
                  className="form-control"
                  value={foodlist.food_name}
                  onChange={handleInput}
                />
                <span className="text-danger">{inputErrorList.food_name}</span>
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
                  value={foodlist.unit}
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

export default Addfoodlist;
