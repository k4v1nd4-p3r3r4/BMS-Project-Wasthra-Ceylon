import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './InvoiceStyles.css';

function PurchaseInvoicePage() {
  const { purchase_id } = useParams();
  const [purchase, setPurchase] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/purchaseMaterial/${purchase_id}/invoice-data`)
      .then((response) => {
        if (response.data.status === 200) {
          setPurchase(response.data.purchase);
        }
      });
  }, [purchase_id]);

  const downloadInvoice = () => {
    axios({
      url: `http://127.0.0.1:8000/api/purchaseMaterial/${purchase_id}/invoice`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${purchase_id}.pdf`);
      document.body.appendChild(link);
      link.click();
    });
  };

  const printInvoice = () => {
    window.print();
  };

  if (!purchase) {
    return <div>Loading...</div>;
  }

  return (
    <div className="invoice-container">
      
      <div className="company-name">Wasthra Ceylon</div>
      <h5>Invoice</h5>
      <div className="invoice-details">
        <p><strong>Purchase ID:</strong> {purchase.purchase_id}</p>
        <p><strong>Material ID:</strong> {purchase.material_id}</p>
        <p><strong>Supplier ID:</strong> {purchase.supplier_id}</p>
        <p><strong>Date:</strong> {purchase.date}</p>
        <p><strong>Quantity:</strong> {purchase.qty}</p>
        <p><strong>Unit Price:</strong> {purchase.unit_price}</p>
        <p><strong>Total Amount:</strong> {purchase.total_amount}</p>
      </div>
      <div className="invoice-actions">
        <button onClick={printInvoice} className="btn btn-primary">Print Invoice</button>
        <button onClick={downloadInvoice} className="btn btn-secondary">Download PDF</button>
      </div>
    </div>
  );
}

export default PurchaseInvoicePage;
