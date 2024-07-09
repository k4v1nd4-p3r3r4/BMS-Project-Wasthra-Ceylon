import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../../components/Pagination";
import Modal from "react-bootstrap/Modal";
import "./buyers.css";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
import AddBuyers from "./AddBuyers";
import SearchBox from "../../../components/SearchBox"; // Import the SearchBox component
import EditBuyers from "./EditBuyers";

function Buyers() {
  const [modalShow, setModalShow] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/customers")
      .then((res) => {
        setCustomers(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  // Logic to get current customers for the current page and search term
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredCustomers = customers
    .filter((customer) =>
      Object.values(customer).some(
        (val) =>
          val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  // Logic for rendering pagination buttons
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredCustomers.length / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleShow = (customerId) => {
    setSelectedCustomerId(customerId);
    setModalShow(true);
  };

  // Customer delete function
  const deleteCustomer = (e, customer_id) => {
    e.preventDefault();
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );
    if (shouldDelete) {
      const thisClicked = e.currentTarget;
      axios
        .delete(
          `http://127.0.0.1:8000/api/customers/${customer_id}/customerdelete`
        )
        .then((res) => {
          alert(res.data.message);
          thisClicked.closest("tr").remove();
          // Reload the customers page
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

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Header />
      <Sidebar />

      <PageTitle page="Customers" pages={["Customers"]} icon="bi bi-house-up" />
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
                  <AddBuyers />
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Customer Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Render customersDetails based on filteredCustomers */}
                      {filteredCustomers.map((cus, index) => (
                        <tr key={index}>
                          <td>{cus.customer_id}</td>
                          <td>{cus.first_name}</td>
                          <td>{cus.last_name}</td>
                          <td>{cus.contact}</td>
                          <td>{cus.address}</td>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={() => handleShow(cus.customer_id)}
                            >
                              <i className="bi bi-pencil-square"></i>{" "}
                              {/* Edit icon */}
                            </button>
                            <button
                              className="btn btn-danger"
                              style={{ marginLeft: "5px" }}
                              onClick={(e) =>
                                deleteCustomer(e, cus.customer_id)
                              }
                            >
                              <i className="bi bi-trash"></i>{" "}
                              {/* Delete icon */}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr></tr>
                    </tfoot>
                  </table>
                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredCustomers.length}
                    paginate={paginate}
                    className="custom-pagination"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal for editing customers */}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Customer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCustomerId && (
            <EditBuyers customer_id={selectedCustomerId} />
          )}
        </Modal.Body>
        <Modal.Footer>
          {/* Hidden button for simulating modal close */}
          <button
            id="editCustomerModal"
            style={{ display: "none" }}
            data-bs-dismiss="modal"
          ></button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Buyers;
