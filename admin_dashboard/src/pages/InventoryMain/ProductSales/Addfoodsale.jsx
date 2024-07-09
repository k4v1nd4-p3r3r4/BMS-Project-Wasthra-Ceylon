import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import {
  fetchFoodIds,
  fetchCustomerIds,
} from "../../../components/Apiservices";

function Addfoodsale() {
  const [modalShow, setModalShow] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});
  const [foodIds, setFoodIds] = useState([]); //this is for get food id to dropdown list
  const [customerIds, setCustomerIds] = useState([]); //this is for get customer id to dropdown list

  const [foodsale, setfoodsale] = useState({
    food_id: "",
    customer_id: "",
    date: "",
    qty: "",
    unit_price: "",
  });

  useEffect(() => {
    fetchFoodIds(setFoodIds); // Call fetchFoodIds and update foodlIds state
    fetchCustomerIds(setCustomerIds); //// Call fetchCustomerIds and update CustomerIds state
  }, []);

  const handleShow = () => {
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
  };

  const handleInput = (e) => {
    e.persist();
    setfoodsale({
      ...foodsale,
      [e.target.name]: e.target.value,
    });
  };

  const saveFoodsale = (e) => {
    e.preventDefault();
    const data = {
      food_id: foodsale.food_id,
      customer_id: foodsale.customer_id,
      date: foodsale.date,
      qty: foodsale.qty,
      unit_price: foodsale.unit_price,
    };

    axios
      .post("http://127.0.0.1:8000/api/foodsales", data)
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
    setfoodsale({
      food_id: "",
      customer_id: "",
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
            Add Food Sale
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={saveFoodsale}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="food_id" className="form-label">
                  Food id
                </label>
                <select
                  name="food_id"
                  id="food_id"
                  className="form-control"
                  value={foodsale.food_id}
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
                <label htmlFor="customer_id" className="form-label">
                  Customer id
                </label>
                <select
                  name="customer_id"
                  id="customer_id"
                  className="form-control"
                  value={foodsale.customer_id}
                  onChange={handleInput}
                >
                  <option value="">Select curomer ID</option>
                  {customerIds.map((customerId) => (
                    <option key={customerId} value={customerId}>
                      {customerId}
                    </option>
                  ))}
                </select>
                <span className="text-danger">
                  {inputErrorList.customer_id}
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
                  value={foodsale.qty}
                  onChange={handleInput}
                />
                <span className="text-danger">{inputErrorList.qty}</span>
              </div>

              <div className="col-md-6">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="form-control"
                  value={foodsale.date}
                  onChange={handleInput}
                />
                <span className="text-danger">{inputErrorList.date}</span>
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="unit_price" className="form-label">
                Unit Price
              </label>
              <input
                type="text"
                name="unit_price"
                id="unit_price"
                placeholder="Enter quantity here.."
                className="form-control"
                value={foodsale.unit_price}
                onChange={handleInput}
              />
              <span className="text-danger">{inputErrorList.unit_price}</span>
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

export default Addfoodsale;
