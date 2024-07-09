import React, { useEffect, useState } from "react";
import axios from "axios";

function Edithandlist({ hand_id }) {
  const [inputErrorList, setInputErrorList] = useState({});
  const [handlist, sethandlist] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/handlist/${hand_id}/handedit`)
      .then((res) => {
        console.log(res);
        sethandlist(res.data.handitems);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
  }, [hand_id]);

  const handleInput = (e) => {
    e.persist();
    sethandlist({
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
      .put(`http://127.0.0.1:8000/api/handlist/${hand_id}/handedit`, data)
      .then((res) => {
        alert(res.data.message);
        // Close the modal
        document.getElementById("edithandlistModal").click();
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
      <form onSubmit={saveHandlist}>
        <div className="row mb-3">
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
              type="submit"
              className="btn btn-primary"
              style={{ marginRight: "5px" }}
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Edithandlist;
