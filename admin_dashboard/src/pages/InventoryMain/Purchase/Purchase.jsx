import "./purchase.css";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import PageTitle from "../../../components/PageTitle/PageTitle";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import AddPurchase from "./AddPurchase";
import Editpurchase from "./Editpurchase";
import Pagination from "../../../components/Pagination";
import SearchBox from "../../../components/SearchBox"; // Import the SearchBox component
import { Link } from "react-router-dom";

function Purchase() {
  const pages = ["Purchase"];
  const icon = "bi bi-house-up";

  const [modalShow, setModalShow] = useState(false);
  const [selectPurchaseId, setSelectedPurchaseId] = useState(null);
  const [purchase, setPurchase] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/purchaseMaterial").then((res) => {
      console.log(res);
      setPurchase(res.data.purchase);
    });
  }, []);

  // Logic to get current purchase for the current page and search term
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredPurchase = purchase
    .filter((item) =>
      Object.values(item).some(
        (val) =>
          val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  // Logic for rendering pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(purchase.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleShow = (purchaseId) => {
    setSelectedPurchaseId(purchaseId);
    setModalShow(true);
  };

  const deletepurchase = (e, purchase_id) => {
    e.preventDefault();
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this material?"
    );
    if (shouldDelete) {
      const thisClicked = e.currentTarget;
      axios
        .delete(
          `http://127.0.0.1:8000/api/purchaseMaterial/${purchase_id}/purchasedelete`
        )
        .then((res) => {
          alert(res.data.message);
          thisClicked.closest("tr").remove();
          // Reload the materials page
          window.location.reload();
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status === 422) {
              alert(error.response.data);
            }
          }
        });
    }
  };

  var PurchaseMaterialsDetails = "";
  PurchaseMaterialsDetails = filteredPurchase.map((pitem, index) => {
    return (
      <tr key={index}>
        <td>{pitem.purchase_id}</td>
        <td>{pitem.material_id}</td>
        <td>{pitem.supplier_id}</td>
        <td>{pitem.date}</td>
        <td>{pitem.qty}</td>
        <td>{pitem.unit_price}</td>
        <td>{pitem.total_amount}</td>
        <td>
          <button
            className="btn btn-success"
            onClick={() => handleShow(pitem.purchase_id)}
          >
            <i className="bi bi-pencil-square"></i> {/* Edit icon */}
          </button>
          <button
            className="btn btn-danger"
            style={{ marginLeft: "5px" }}
            onClick={(e) => deletepurchase(e, pitem.purchase_id)}
          >
            <i className="bi bi-trash"></i> {/* Edit icon */}
          </button>
          <Link
            to={`/invoice/${pitem.purchase_id}`}
            className="btn btn-info"
            style={{ marginLeft: "5px" }}
          >
            <i className="bi bi-file-earmark-text"></i> {/* Invoice icon */}
          </Link>
        </td>
      </tr>
    );
  });

  // Function to handle changes in the search term
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Purchase" pages={pages} icon={icon} />
      <main id="main" className="main" style={{ marginTop: "2px" }}>
        <div className="container tbl-container">
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
                  <AddPurchase />
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Purchase Id</th>
                        <th>Material Id</th>
                        <th>Supplier Id</th>
                        <th>Date</th>
                        <th>Qty</th>
                        <th>Unit Price&nbsp;(Rs)</th>
                        <th>Total Amount&nbsp;(Rs)</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{PurchaseMaterialsDetails}</tbody>
                  </table>
                  <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredPurchase.length}
                    paginate={paginate}
                    className="custom-pagination"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Purchase
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectPurchaseId && <Editpurchase purchase_id={selectPurchaseId} />}
        </Modal.Body>
        <Modal.Footer>
          {/* Hidden button for simulating modal close */}
          <button
            id="editpurchaseModal"
            style={{ display: "none" }}
            data-bs-dismiss="modal"
          ></button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Purchase;
