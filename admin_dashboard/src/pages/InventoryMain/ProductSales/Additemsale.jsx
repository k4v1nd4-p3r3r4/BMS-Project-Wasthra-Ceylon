import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import {
  fetchItemIds,
  fetchCustomerIds,
} from "../../../components/Apiservices";

function Additemsale() {
  const [modalShow, setModalShow] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});
  const [itemIds, setItemIds] = useState([]); //this is for get item id to dropdown list
  const [customerIds, setCustomerIds] = useState([]); //this is for get customer id to dropdown list

  const [itemsale, setitemsale] = useState({
    item_id: "",
    customer_id: "",
    date: "",
    qty: "",
    unit_price: "",
  });

  useEffect(() => {
    fetchItemIds(setItemIds); // Call fetchItems and update foodlIds state
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
    setitemsale({
      ...itemsale,
      [e.target.name]: e.target.value,
    });
  };

  const saveItemsale = (e) => {
    e.preventDefault();
    const data = {
      item_id: itemsale.item_id,
      customer_id: itemsale.customer_id,
      date: itemsale.date,
      qty: itemsale.qty,
      unit_price: itemsale.unit_price,
    };

    axios
      .post("http://127.0.0.1:8000/api/handsales", data)
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
    setitemsale({
      item_id: "",
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
            Add Item Sale
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={saveItemsale}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="food_id" className="form-label">
                  Item id
                </label>
                <select
                  name="item_id"
                  id="item_id"
                  className="form-control"
                  value={itemsale.item_id}
                  onChange={handleInput}
                >
                  <option value="">Select item ID</option>
                  {itemIds.map((itemId) => (
                    <option key={itemId} value={itemId}>
                      {itemId}
                    </option>
                  ))}
                </select>
                <span className="text-danger">{inputErrorList.item_id}</span>
              </div>

              <div className="col-md-6">
                <label htmlFor="customer_id" className="form-label">
                  Customer id
                </label>
                <select
                  name="customer_id"
                  id="customer_id"
                  className="form-control"
                  value={itemsale.customer_id}
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
                  value={itemsale.qty}
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
                  value={itemsale.date}
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
                value={itemsale.unit_price}
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

export default Additemsale;
