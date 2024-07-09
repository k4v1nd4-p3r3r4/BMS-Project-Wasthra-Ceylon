import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchItemIds } from "../../../components/Apiservices";

function EditItemManu({ manuitem_id }) {
  const [inputErrorList, setInputErrorList] = useState({});
  const [itemIds, setItemIds] = useState([]); //this is for get item id to dropdown list
  const [manuitem, setmanuItem] = useState({});

  useEffect(() => {
    fetchItemIds(setItemIds); // Call fetchitemIds and update itemlIds state
  }, []);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/manuitems/${manuitem_id}/manuitemsedit`)
      .then((res) => {
        console.log(res);
        setmanuItem(res.data.manuitems);
      })
      .catch((error) => {
        console.error("Error fetching manuitem details:", error);
      });
  }, [manuitem_id]);

  const handleInput = (e) => {
    e.persist();
    setmanuItem({
      ...manuitem,
      [e.target.name]: e.target.value,
    });
  };

  const saveItemmenu = (e) => {
    e.preventDefault();
    const data = {
      item_id: manuitem.item_id,
      qty: manuitem.qty,
      date: manuitem.date,
    };

    axios
      .put(
        `http://127.0.0.1:8000/api/manuitems/${manuitem_id}/manuitemsedit`,
        data
      )
      .then((res) => {
        alert(res.data.message);
        // Close the modal
        document.getElementById("editmanuitemModal").click();
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
      <form onSubmit={saveItemmenu}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="food_id" className="form-label">
              Item id
            </label>
            <select
              name="item_id"
              id="item_id"
              className="form-control"
              value={manuitem.item_id}
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
            <label htmlFor="qty" className="form-label">
              Qty
            </label>
            <input
              type="text"
              name="qty"
              id="qty"
              placeholder="Enter quantity here.."
              className="form-control"
              value={manuitem.qty}
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
              value={manuitem.date}
              onChange={handleInput}
            />
            <span className="text-danger">{inputErrorList.date}</span>
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

export default EditItemManu;
