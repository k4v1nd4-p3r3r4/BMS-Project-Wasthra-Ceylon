import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../../components/Pagination";
import Addfoodlist from "./Addfoodlist";
import Modal from "react-bootstrap/Modal";
import Editfoodlist from "./Editfoodlist";
import SearchBox from "../../../components/SearchBox"; // Import the SearchBox component

function Foodlist() {
  const [modalShow, setModalShow] = useState(false);
  const [foodlist, setFoodlist] = useState([]);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term

  // Fetch food list data
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/foodlist")
      .then((res) => {
        console.log("Food list data:", res.data);
        setFoodlist(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching foodlist", error);
      });
  }, []);

  // Logic to get current foods for the current page and search term
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredFoodlist = foodlist
    .filter((item) =>
      Object.values(item).some(
        (val) =>
          val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  // Logic for rendering pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(foodlist.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // This function handles showing the modal for editing food item
  const handleShow = (foodId) => {
    setSelectedFoodId(foodId);
    setModalShow(true);
  };

  // This function handles deleting a food item
  const deleteFood = (e, food_id) => {
    e.preventDefault();
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this food item?"
    );
    if (shouldDelete) {
      const thisClicked = e.currentTarget;
      axios
        .delete(`http://127.0.0.1:8000/api/foodlist/${food_id}/fooddelete`)
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

  // This maps the filtered food details to table rows
  const foodlistdetails = filteredFoodlist.map((fdlist, index) => (
    <tr key={index}>
      <td>{fdlist.food_id}</td>
      <td>{fdlist.food_name}</td>
      <td>{fdlist.unit}</td>
      <td>{fdlist.qty}</td>
      <td>
        <button
          className="btn btn-success"
          onClick={() => handleShow(fdlist.food_id)}
        >
          <i className="bi bi-pencil-square"></i> {/* Edit icon */}
        </button>

        <button
          className="btn btn-danger"
          style={{ marginLeft: "5px" }}
          onClick={(e) => deleteFood(e, fdlist.food_id)}
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
                <Addfoodlist />
              </div>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Food Id</th>
                    <th>Food Name</th>
                    <th>Unit</th>
                    <th>Available Qty</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{foodlistdetails}</tbody>
                <tfoot>
                  <tr></tr>
                </tfoot>
              </table>
              <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={filteredFoodlist.length}
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
            Edit Foodlist
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFoodId && <Editfoodlist food_id={selectedFoodId} />}
        </Modal.Body>
        <Modal.Footer>
          {/* Hidden button for simulating modal close */}
          <button
            id="editfoodlistModal"
            style={{ display: "none" }}
            data-bs-dismiss="modal"
          ></button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Foodlist;
