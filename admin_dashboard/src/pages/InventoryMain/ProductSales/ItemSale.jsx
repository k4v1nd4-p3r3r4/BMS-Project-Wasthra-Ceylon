import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../../components/Pagination";
import Modal from "react-bootstrap/Modal";
import Additemsale from "./Additemsale";
import Edititemsale from "./Edititemsale";
import SearchBox from "../../../components/SearchBox"; // Import the SearchBox component
import { Link } from "react-router-dom";

function ItemSale() {
  const [modalShow, setModalShow] = useState(false);
  const [itemsale, setItemsale] = useState([]);
  const [selectedItemSaleId, setSelectedItemSaleId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/handsales")
      .then((res) => {
        console.log("Item sale data:", res.data);
        setItemsale(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching item sale", error);
      });
  }, []);

  // Logic to get current item sale for the current page and search term
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredSaleItem = itemsale
    .filter((sale) =>
      Object.values(sale).some(
        (val) =>
          val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  // Logic for rendering pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredSaleItem.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // This function handles showing the modal for editing item sale
  const handleShow = (saleId) => {
    setSelectedItemSaleId(saleId);
    setModalShow(true);
  };

  // This function handles deleting an item sale
  const deleteItemSale = (e, saleId) => {
    e.preventDefault();
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this item sale?"
    );
    if (shouldDelete) {
      const thisClicked = e.currentTarget;
      axios
        .delete(`http://127.0.0.1:8000/api/handsales/${saleId}/handsaledelete`)
        .then((res) => {
          alert(res.data.message);
          thisClicked.closest("tr").remove();
          // Reload the page to reflect changes
          window.location.reload();
        })
        .catch(function (error) {
          if (error.response && error.response.status === 422) {
            alert(error.response.data);
          }
        });
    }
  };

  // This maps the filtered item sale details to table rows
  const SaleItemDetails = filteredSaleItem.map((sale, index) => (
    <tr key={index}>
      <td>{sale.sale_id}</td>
      <td>{sale.item_id}</td>
      <td>{sale.customer_id}</td>
      <td>{sale.date}</td>
      <td>{sale.qty}</td>
      <td>{sale.unit_price}</td>
      <td>{sale.total_amount}</td>
      <td>
        <button
          className="btn btn-success"
          onClick={() => handleShow(sale.sale_id)}
        >
          <i className="bi bi-pencil-square"></i> {/* Edit icon */}
        </button>
        <button
          className="btn btn-danger"
          style={{ marginLeft: "5px" }}
          onClick={(e) => deleteItemSale(e, sale.sale_id)}
        >
          <i className="bi bi-trash"></i> {/* Delete icon */}
        </button>
        <Link
          to={`/itemsales/${sale.sale_id}/invoice`}
          className="btn btn-info"
          style={{ marginLeft: "5px" }}
        >
          <i className="bi bi-file-earmark-text"></i> {/* Invoice icon */}
        </Link>
      </td>
    </tr>
  ));

  // This function handles changes in the search term input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="container tbl-container" style={{ marginLeft: "5px" }}>
        <div className="row tbl-fixed">
          <div className="col-md-12">
            <div className="card">
              <div
                className="card-header custom-card-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <SearchBox
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                />
                <Additemsale />
              </div>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Sale Id</th>
                    <th>Item Id</th>
                    <th>Customer Id</th>
                    <th>Date</th>
                    <th>Qty</th>
                    <th>Unit Price&nbsp;(Rs)</th>
                    <th>Total Amount&nbsp;(Rs)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{SaleItemDetails}</tbody>
                <tfoot>
                  <tr></tr>
                </tfoot>
              </table>
              <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={filteredSaleItem.length}
                paginate={paginate}
                className="custom-pagination"
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Item Sale
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItemSaleId && (
            <Edititemsale handsale_id={selectedItemSaleId} />
          )}
        </Modal.Body>
        <Modal.Footer>
          {/* Hidden button for simulating modal close */}
          <button
            id="editsaleitemModal"
            style={{ display: "none" }}
            data-bs-dismiss="modal"
          ></button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ItemSale;
