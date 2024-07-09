import React, { useEffect, useState } from "react";
import axios from "axios";

function EditSupplier({ supplier_id }) {
  const [inputErrorList, setInputErrorList] = useState({});
  const [supplier, setSuppliers] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/suppliers/${supplier_id}/supplieredit`)
      .then((res) => {
        console.log(res);
        setSuppliers(res.data.supplier);
      })
      .catch((error) => {
        console.error("Error fetching supplier details:", error);
      });
  }, [supplier_id]);

  const handleInput = (e) => {
    e.persist();
    setSuppliers({
      ...supplier,
      [e.target.name]: e.target.value,
    });
  };

  const saveSupplier = (e) => {
    e.preventDefault();
    const data = {
      supplier_id: supplier.supplier_id,
      supplier_name: supplier.supplier_name,
      contact_number: supplier.contact_number,
      address: supplier.address,
    };

    axios
      .put(
        `http://127.0.0.1:8000/api/suppliers/${supplier_id}/supplieredit`,
        data
      )
      .then((res) => {
        alert(res.data.message);
        // Close the modal
        document.getElementById("editSupplierModal").click();
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
      <form onSubmit={saveSupplier}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="sname" className="form-label">
              Supplier Name
            </label>
            <input
              type="text"
              name="supplier_name"
              id="sname"
              placeholder="Enter name here.."
              className="form-control"
              value={supplier.supplier_name}
              onChange={handleInput}
            />
            <span className="text-danger">{inputErrorList.supplier_name}</span>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="contact" className="form-label">
              Contact Number
            </label>
            <input
              type="text"
              name="contact_number"
              id="contact"
              placeholder="Enter contact here.."
              className="form-control"
              value={supplier.contact_number}
              onChange={handleInput}
            />
            <span className="text-danger">{inputErrorList.contact_number}</span>
          </div>{" "}
          <div className="col-md-6">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Enter address here.."
              className="form-control"
              value={supplier.address}
              onChange={handleInput}
            />
            <span className="text-danger">{inputErrorList.address}</span>
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

export default EditSupplier;
