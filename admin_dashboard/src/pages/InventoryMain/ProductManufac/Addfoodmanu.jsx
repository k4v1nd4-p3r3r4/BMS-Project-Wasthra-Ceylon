import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { fetchFoodIds } from "../../../components/Apiservices";

function Addfoodmanu() {
  const [modalShow, setModalShow] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});
  const [foodIds, setFoodIds] = useState([]); //this is for get food id to dropdown list

  const [manufood, setmanuFood] = useState({
    food_id: "",
    qty: "",
    date: "",
    exp_date: "",
  });

  useEffect(() => {
    fetchFoodIds(setFoodIds); // Call fetchFoodIds and update foodlIds state
  }, []);

  const handleShow = () => {
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
  };

  const handleInput = (e) => {
    e.persist();
    setmanuFood({
      ...manufood,
      [e.target.name]: e.target.value,
    });
  };

  const saveFoodmenu = (e) => {
    e.preventDefault();
    const data = {
      food_id: manufood.food_id,
      qty: manufood.qty,
      date: manufood.date,
      exp_date: manufood.exp_date,
    };

    axios
      .post("http://127.0.0.1:8000/api/manufood", data)
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
    setmanuFood({
      food_id: "",
      qty: "",
      date: "",
      exp_date: "",
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
          <Modal.Title id="contained-modal-title-vcenter">Add Food</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={saveFoodmenu}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="food_id" className="form-label">
                  Food id
                </label>
                <select
                  name="food_id"
                  id="food_id"
                  className="form-control"
                  value={manufood.food_id}
                  onChange={handleInput}
                >
                  <option value="">Select food ID</option>
                  {foodIds.map((foodId) => (
                    <option key={foodId} value={foodId}>
                      {foodId}
                    </option>
                  ))}
                </select>
                <span className="text-danger">{inputErrorList.food_id}</span>
              </div>
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
                  value={manufood.qty}
                  onChange={handleInput}
                />
                <span className="text-danger">{inputErrorList.qty}</span>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="date" className="form-label">
                  Manu Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="form-control"
                  value={manufood.date}
                  onChange={handleInput}
                />
                <span className="text-danger">{inputErrorList.date}</span>
              </div>
              <div className="col-md-6">
                <label htmlFor="exp_date" className="form-label">
                  Exp Date
                </label>
                <input
                  type="date"
                  name="exp_date"
                  id="exp_date"
                  className="form-control"
                  value={manufood.exp_date}
                  onChange={handleInput}
                />
                <span className="text-danger">{inputErrorList.exp_date}</span>
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
                <button type="submit" className="btn btn-primary">
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

export default Addfoodmanu;
