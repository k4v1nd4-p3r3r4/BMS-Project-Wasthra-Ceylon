import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../../components/Pagination";
import Modal from "react-bootstrap/Modal";
import "./suppliers.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
import AddSupplier from "./AddSupplier";
import SearchBox from "../../../components/SearchBox"; // Import the SearchBox component
import EditSupplier from "./EditSupplier";

function Suppliers() {
  const [modalShow, setModalShow] = useState(false);
  const [supplier, setSuppliers] = useState([]);
  const [selectedSupplierlId, setSelectedSupplierlId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/suppliers")
      .then((res) => {
        setSuppliers(res.data.supplier);
      })
      .catch((error) => {
        console.error("Error fetching suppliers:", error);
      });
  }, []);

  // Logic to get current supplier for the current page and search term
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredSupplier = supplier
    .filter((sup) =>
      Object.values(sup).some((val) =>
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  // Logic for rendering pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredSupplier.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleShow = (supplierId) => {
    setSelectedSupplierlId(supplierId);
    setModalShow(true);
  };

  // Supplier delete function
  const deleteSupplier = (e, supplier_id) => {
    e.preventDefault();
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this supplier?"
    );
    if (shouldDelete) {
      const thisClicked = e.currentTarget;
      axios
        .delete(
          `http://127.0.0.1:8000/api/suppliers/${supplier_id}/supplierdelete`
        )
        .then((res) => {
          alert(res.data.message);
          thisClicked.closest("tr").remove();
          // Reload the suppliers page
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

  const suppliersDetails = filteredSupplier.map((sup, index) => (
    <tr key={index}>
      <td>{sup.supplier_id}</td>
      <td>{sup.supplier_name}</td>
      <td>{sup.contact_number}</td>
      <td>{sup.address}</td>
      <td>
        <button
          className="btn btn-success"
          onClick={() => handleShow(sup.supplier_id)}
        >
          <i className="bi bi-pencil-square"></i> {/* Edit icon */}
        </button>
        <button
          className="btn btn-danger"
          style={{ marginLeft: "5px" }}
          onClick={(e) => deleteSupplier(e, sup.supplier_id)}
        >
          <i className="bi bi-trash"></i> {/* Edit icon */}
        </button>
      </td>
    </tr>
  ));

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Suppliers" pages={["Suppliers"]} icon="bi bi-house-up" />
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
                  <AddSupplier />
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Supplier Id</th>
                        <th>Supplier Name</th>
                        <th>Contact </th>
                        <th>Address</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{suppliersDetails}</tbody>
                    <tfoot>
                      <tr></tr>
                    </tfoot>
                  </table>
                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredSupplier.length}
                    paginate={paginate}
                    className="custom-pagination"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Modal for editing supplier */}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Supplier
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSupplierlId && (
            <EditSupplier supplier_id={selectedSupplierlId} />
          )}
        </Modal.Body>
        <Modal.Footer>
          {/* Hidden button for simulating modal close */}
          <button
            id="editSupplierModal"
            style={{ display: "none" }}
            data-bs-dismiss="modal"
          ></button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Suppliers;
