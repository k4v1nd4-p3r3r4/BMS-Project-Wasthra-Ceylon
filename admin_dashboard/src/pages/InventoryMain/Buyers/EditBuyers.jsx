import React, { useEffect, useState } from "react";
import axios from "axios";

function EditBuyers({ customer_id }) {
  const [inputErrorList, setInputErrorList] = useState({});
  const [customers, setCustomers] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/customers/${customer_id}/customeredit`)
      .then((res) => {
        console.log(res);
        setCustomers(res.data.customer);
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
      });
  }, [customer_id]);

  const handleInput = (e) => {
    e.persist();
    setCustomers({
      ...customers,
      [e.target.name]: e.target.value,
    });
  };

  const saveCustomers = (e) => {
    e.preventDefault();
    const data = {
      customer_id: customers.customer_id,
      first_name: customers.first_name,
      last_name: customers.last_name,
      contact: customers.contact,
      address: customers.address,
    };

    axios
      .put(
        `http://127.0.0.1:8000/api/customers/${customer_id}/customeredit`,
        data
      )
      .then((res) => {
        alert(res.data.message);
        // Close the modal
        document.getElementById("editCustomerModal").click();
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
      <form onSubmit={saveCustomers}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="first_name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              id="fname"
              placeholder="Enter first name here.."
              className="form-control"
              value={customers.first_name}
              onChange={handleInput}
            />
            <span className="text-danger">{inputErrorList.first_name}</span>
          </div>

          <div className="col-md-6">
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              id="lname"
              placeholder="Enter last name here.."
              className="form-control"
              value={customers.last_name}
              onChange={handleInput}
            />
            <span className="text-danger">{inputErrorList.last_name}</span>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="contact" className="form-label">
              Contact Number
            </label>
            <input
              type="text"
              name="contact"
              id="contact"
              placeholder="Enter contact here.."
              className="form-control"
              value={customers.contact}
              onChange={handleInput}
            />
            <span className="text-danger">{inputErrorList.contact}</span>
          </div>

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
              value={customers.address}
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

export default EditBuyers;
