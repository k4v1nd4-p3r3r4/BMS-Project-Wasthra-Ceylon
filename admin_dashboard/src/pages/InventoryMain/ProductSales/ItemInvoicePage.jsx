// src/pages/InvoicePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './ItemInvoice.css';

function ItemInvoicePage() {
  const { sale_id } = useParams();
  const [invoiceDetails, setInvoiceDetails] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/itemsales/${sale_id}/invoice`)
      .then((res) => {
        setInvoiceDetails(res.data.invoice);
      })
      .catch((error) => {
        console.error('Error fetching invoice details', error);
      });
  }, [sale_id]);

  if (!invoiceDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="invoice-container">
      
      <div className="company-name">Wasthra Ceylon</div>
      <h5>Invoice</h5>
      <div className="invoice-details">
        <p><strong>Sale ID:</strong> {invoiceDetails.sale_id}</p>
        <p><strong>Item ID:</strong> {invoiceDetails.item_id}</p>
        <p><strong>Customer ID:</strong> {invoiceDetails.customer_id}</p>
        <p><strong>Date:</strong> {invoiceDetails.date}</p>
        <p><strong>Quantity:</strong> {invoiceDetails.qty}</p>
        <p><strong>Unit Price:</strong> {invoiceDetails.unit_price}</p>
        <p><strong>Total Amount:</strong> {invoiceDetails.total_amount}</p>
      </div>
      <div className="invoice-actions">
        <button className="btn btn-primary" onClick={() => window.print()}>
          Print Invoice
        </button>
        <a href={`http://127.0.0.1:8000/api/itemsales/${sale_id}/invoice/download`} className="btn btn-secondary" download>
          Download PDF
        </a>
      </div>
    </div>
  );
}

export default ItemInvoicePage;
