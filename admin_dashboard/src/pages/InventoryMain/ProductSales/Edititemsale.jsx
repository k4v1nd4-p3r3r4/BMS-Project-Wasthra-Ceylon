import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  fetchItemIds,
  fetchCustomerIds,
} from "../../../components/Apiservices";

function Edititemsale({ handsale_id }) {
  const [inputErrorList, setInputErrorList] = useState({});
  const [customerIds, setCustomerIds] = useState([]);
  const [itemIds, setItemIds] = useState([]); //this is for get item id to dropdown list
  const [itemsale, setitemsale] = useState({});

  useEffect(() => {
    fetchItemIds(setItemIds); // Call fetchCustomerIds and update foodlIds state
    fetchCustomerIds(setCustomerIds); // Call fetchCustomerIds and update customerIds state
  }, []);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/handsales/${handsale_id}/handsaleedit`)
      .then((res) => {
        console.log(res);
        setitemsale(res.data.handsale);
      })
      .catch((error) => {
        console.error("Error fetching handsale details:", error);
      });
  }, [handsale_id]);

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
      .put(
        `http://127.0.0.1:8000/api/handsales/${handsale_id}/handsaleedit`,
        data
      )
      .then((res) => {
        alert(res.data.message);
        // Close the modal
        document.getElementById("editsaleitemModal").click();
        // Reload the materials page
        window.location.reload();
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
  return (
    <>
      <form onSubmit={saveItemsale}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="item_id" className="form-label">
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
            <span className="text-danger">{inputErrorList.customer_id}</span>
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
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Edititemsale;
