import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../../components/Pagination";
import Addhandlist from "./Addhandlist";
import Modal from "react-bootstrap/Modal";
import Edithandlist from "./Edithandlist";
import SearchBox from "../../../components/SearchBox"; // Import the SearchBox component

function Handlist() {
  const [modalShow, setModalShow] = useState(false);
  const [handlist, setHandlist] = useState([]);
  const [selectedHanddId, setSelectedHandlId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term

  // Fetch handlist data
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/handlist")
      .then((res) => {
        console.log("Hand craft list data:", res.data);
        setHandlist(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching handlist", error);
      });
  }, []);

  // Logic to get current handlist for the current page and search term
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredHandlist = handlist
    .filter((item) =>
      Object.values(item).some(
        (val) =>
          val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  // Logic for rendering pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(handlist.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleShow = (itemId) => {
    setSelectedHandlId(itemId);
    setModalShow(true);
  };

  const deleteitem = (e, hand_id) => {
    e.preventDefault();
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this food item?"
    );
    if (shouldDelete) {
      const thisClicked = e.currentTarget;
      axios
        .delete(`http://127.0.0.1:8000/api/handlist/${hand_id}/handdelete`)
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

  const handlistdetails = filteredHandlist.map((hdlist, index) => (
    <tr key={index}>
      <td>{hdlist.item_id}</td>
      <td>{hdlist.item_name}</td>
      <td>{hdlist.unit}</td>
      <td>{hdlist.qty}</td>
      <td>
        <button
          className="btn btn-success"
          onClick={() => handleShow(hdlist.item_id)}
        >
          <i className="bi bi-pencil-square"></i> {/* Edit icon */}
        </button>

        <button
          className="btn btn-danger"
          style={{ marginLeft: "5px" }}
          onClick={(e) => deleteitem(e, hdlist.item_id)}
        >
          <i className="bi bi-trash"></i> {/* Edit icon */}
        </button>
      </td>
    </tr>
  ));

  // Function to handle changes in the search term
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
                <Addhandlist />
              </div>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Item Id</th>
                    <th>Item Name</th>

                    <th>Unit</th>
                    <th>Available Qty</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{handlistdetails}</tbody>
                <tfoot>
                  <tr></tr>
                </tfoot>
              </table>
              <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={filteredHandlist.length}
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
            Edit Handcraft
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedHanddId && <Edithandlist hand_id={selectedHanddId} />}
        </Modal.Body>
        <Modal.Footer>
          {/* Hidden button for simulating modal close */}
          <button
            id="edithandlistModal"
            style={{ display: "none" }}
            data-bs-dismiss="modal"
          ></button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Handlist;
