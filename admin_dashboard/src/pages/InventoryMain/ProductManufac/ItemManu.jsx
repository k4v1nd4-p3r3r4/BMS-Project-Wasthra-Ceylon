import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../../components/Pagination";
import Modal from "react-bootstrap/Modal";
import AdditemManu from "./AdditemManu";
import EditItemManu from "./EditItemManu";
import SearchBox from "../../../components/SearchBox"; // Import the SearchBox component

function ItemManu() {
  const [modalShow, setModalShow] = useState(false);
  const [manuitems, setManuItems] = useState([]);
  const [selectedManuItemId, setSelectedManuItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/manuitems")
      .then((res) => {
        console.log("ManuItem list data:", res.data);
        setManuItems(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching foodlist", error);
      });
  }, []);

  // Logic to get current Manuitems for the current page and search term
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredManuItems = manuitems
    .filter((item) =>
      Object.values(item).some(
        (val) =>
          val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  // Logic for rendering pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(manuitems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // This function handles showing the modal for editing item
  const handleShow = (manuItemId) => {
    setSelectedManuItemId(manuItemId);
    setModalShow(true);
  };

  // This function handles deleting an item
  const deleteManuItem = (e, manuItemId) => {
    e.preventDefault();
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this food item?"
    );
    if (shouldDelete) {
      const thisClicked = e.currentTarget;
      axios
        .delete(
          `http://127.0.0.1:8000/api/manuitems/${manuItemId}/manuitemsdelete`
        )
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

  // This maps the filtered item details to table rows
  const ManuItemDetails = filteredManuItems.map((manuit, index) => (
    <tr key={index}>
      <td>{manuit.manu_id}</td>
      <td>{manuit.item_id}</td>
      <td>{manuit.qty}</td>
      <td>{manuit.date}</td>
      <td>
        <button
          className="btn btn-success"
          onClick={() => handleShow(manuit.manu_id)}
        >
          <i className="bi bi-pencil-square"></i> {/* Edit icon */}
        </button>
        <button
          className="btn btn-danger"
          style={{ marginLeft: "5px" }}
          onClick={(e) => deleteManuItem(e, manuit.manu_id)}
        >
          <i className="bi bi-trash"></i> {/* Delete icon */}
        </button>
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
                <AdditemManu />
              </div>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Manu Id</th>
                    <th>Item Id</th>
                    <th>Qty</th>
                    <th>Mnu Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{ManuItemDetails}</tbody>
                <tfoot>
                  <tr></tr>
                </tfoot>
              </table>
              <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={filteredManuItems.length}
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
            Edit Item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedManuItemId && (
            <EditItemManu manuitem_id={selectedManuItemId} />
          )}
        </Modal.Body>
        <Modal.Footer>
          {/* Hidden button for simulating modal close */}
          <button
            id="editmanuitemModal"
            style={{ display: "none" }}
            data-bs-dismiss="modal"
          ></button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ItemManu;
