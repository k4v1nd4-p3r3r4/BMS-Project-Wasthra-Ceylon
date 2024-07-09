import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  fetchMaterialIds,
  fetchSupplierIds,
} from "../../../components/Apiservices";

function Editpurchase({ purchase_id }) {
  const [inputErrorList, setInputErrorList] = useState({});
  const [purchase, setPurchase] = useState({});
  const [materialIds, setMaterialIds] = useState([]); //this is for get material id to dropdown list
  const [supplierIds, setSupplierIds] = useState([]);

  useEffect(() => {
    fetchMaterialIds(setMaterialIds); // Call fetchMaterialIds and update materialIds state
    fetchSupplierIds(setSupplierIds); // Call fetchSupplierIds and update supplierIds state
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/purchaseMaterial/${purchase_id}/purchaseedit`
      )
      .then((res) => {
        console.log(res);
        setPurchase(res.data.purchase);
      })
      .catch((error) => {
        console.error("Error fetching purchase details:", error);
      });
  }, [purchase_id]);

  const handleInput = (e) => {
    e.persist();
    setPurchase({
      ...purchase,
      [e.target.name]: e.target.value,
    });
  };
  const savePurchase = (e) => {
    e.preventDefault();
    const data = {
      material_id: purchase.material_id,
      supplier_id: purchase.supplier_id,
      date: purchase.date,
      qty: purchase.qty,
      unit_price: purchase.unit_price,
    };

    axios
      .put(
        `http://127.0.0.1:8000/api/purchaseMaterial/${purchase_id}/purchaseedit`,
        data
      )
      .then((res) => {
        alert(res.data.message);
        // Close the modal
        document.getElementById("editpurchaseModal").click();
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
      <form onSubmit={savePurchase}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="material_id" className="form-label">
              Material id
            </label>
            <select
              name="material_id"
              id="material_id"
              className="form-control"
              value={purchase.material_id}
              onChange={handleInput}
            >
              <option value="">Select Material ID</option>
              {materialIds.map((materialId) => (
                <option key={materialId} value={materialId}>
                  {materialId}
                </option>
              ))}
            </select>
            <span className="text-danger">{inputErrorList.material_id}</span>
          </div>

          <div className="col-md-6">
            <label htmlFor="supplier_id" className="form-label">
              Supplier id
            </label>
            <select
              name="supplier_id"
              id="supplier_id"
              className="form-control"
              value={purchase.supplier_id}
              onChange={handleInput}
            >
              <option value="">Select Supplier ID</option>
              {supplierIds.map((supplierId) => (
                <option key={supplierId} value={supplierId}>
                  {supplierId}
                </option>
              ))}
            </select>
            <span className="text-danger">{inputErrorList.supplier_id}</span>
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
              value={purchase.qty}
              onChange={handleInput}
            />
            <span className="text-danger">{inputErrorList.qty}</span>
          </div>

          <div className="col-md-6">
            <label htmlFor="unit_price" className="form-label">
              Unit price
            </label>
            <input
              type="text"
              name="unit_price"
              id="unit_price"
              placeholder="Enter unit price here.."
              className="form-control"
              value={purchase.unit_price}
              onChange={handleInput}
            />
            <span className="text-danger">{inputErrorList.unit_price}</span>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="form-control"
              value={purchase.date}
              onChange={handleInput}
            />
            <span className="text-danger">{inputErrorList.date}</span>
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

export default Editpurchase;
