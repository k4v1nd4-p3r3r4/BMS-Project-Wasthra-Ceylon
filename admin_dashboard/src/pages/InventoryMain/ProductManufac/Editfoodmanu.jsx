import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchFoodIds } from "../../../components/Apiservices";

function Editfoodmanu({ manufood_id }) {
  const [inputErrorList, setInputErrorList] = useState({});
  const [foodIds, setFoodIds] = useState([]); //this is for get food id to dropdown list
  const [manufood, setmanuFood] = useState({});

  useEffect(() => {
    fetchFoodIds(setFoodIds); // Call fetchFoodIds and update foodlIds state
  }, []);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/manufood/${manufood_id}/manufoodedit`)
      .then((res) => {
        console.log(res);
        setmanuFood(res.data.manufood);
      })
      .catch((error) => {
        console.error("Error fetching manufood details:", error);
      });
  }, [manufood_id]);

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
      .put(
        `http://127.0.0.1:8000/api/manufood/${manufood_id}/manufoodedit`,
        data
      )
      .then((res) => {
        alert(res.data.message);
        // Close the modal
        document.getElementById("editmanufoodModal").click();
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
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Editfoodmanu;
