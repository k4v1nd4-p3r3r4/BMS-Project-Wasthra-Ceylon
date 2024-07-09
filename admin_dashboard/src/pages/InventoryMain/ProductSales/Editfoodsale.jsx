import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  fetchFoodIds,
  fetchCustomerIds,
} from "../../../components/Apiservices";

function Editfoodsale({ foodsale_id }) {
  const [inputErrorList, setInputErrorList] = useState({});
  const [foodIds, setFoodIds] = useState([]); //this is for get food id to dropdown list
  const [customerIds, setCustomerIds] = useState([]);
  const [foodsale, setfoodsale] = useState({});

  useEffect(() => {
    fetchFoodIds(setFoodIds); // Call fetchFoodIds and update foodlIds state
    fetchCustomerIds(setCustomerIds); // Call fetchCustomerIds and update customerIds state
  }, []);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/foodsales/${foodsale_id}/foodsaleedit`)
      .then((res) => {
        console.log(res);
        setfoodsale(res.data.foodsale);
      })
      .catch((error) => {
        console.error("Error fetching foodsale details:", error);
      });
  }, [foodsale_id]);

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
      .put(
        `http://127.0.0.1:8000/api/foodsales/${foodsale_id}/foodsaleedit`,
        data
      )
      .then((res) => {
        alert(res.data.message);
        // Close the modal
        document.getElementById("editsalefoodModal").click();
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
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Editfoodsale;
