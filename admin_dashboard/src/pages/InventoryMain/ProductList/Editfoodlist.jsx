import React, { useEffect, useState } from "react";
import axios from "axios";

function Editfoodlist({ food_id }) {
  const [inputErrorList, setInputErrorList] = useState({});
  const [foodlist, setFoodlist] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/foodlist/${food_id}/foodedit`)
      .then((res) => {
        console.log(res);
        setFoodlist(res.data.fooditems);
      })
      .catch((error) => {
        console.error("Error fetching food details:", error);
      });
  }, [food_id]);

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
      .put(`http://127.0.0.1:8000/api/foodlist/${food_id}/foodedit`, data)
      .then((res) => {
        alert(res.data.message);
        // Close the modal
        document.getElementById("editfoodlistModal").click();
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
      <form onSubmit={saveFoodlist}>
        <div className="row mb-3">
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

        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginRight: "5px" }}
        >
          Update
        </button>
      </form>
    </>
  );
}

export default Editfoodlist;
