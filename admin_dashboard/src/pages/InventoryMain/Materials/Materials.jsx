import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTitle from "../../../components/PageTitle/PageTitle";
import AddMaterial from "./MaterialOperations/AddMaterial";
import Editmaterials from "./MaterialOperations/Editmaterials";
import Pagination from "../../../components/Pagination"; // Import Pagination component
import "./materials.css";
import SearchBox from "../../../components/SearchBox"; // Import the SearchBox component

function Materials() {
  const [modalShow, setModalShow] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/materials")
      .then((res) => {
        setMaterials(res.data.materials);
      })
      .catch((error) => {
        console.error("Error fetching materials:", error);
      });
  }, []);

  // Logic to get current materials for the current page and search term
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredMaterials = materials
    .filter((item) =>
      Object.values(item).some(
        (val) =>
          val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  // Logic for rendering pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(materials.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleShow = (materialId) => {
    setSelectedMaterialId(materialId);
    setModalShow(true);
  };

  // Material delete function
  const deletematerial = (e, material_id) => {
    e.preventDefault();
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this material?"
    );
    if (shouldDelete) {
      const thisClicked = e.currentTarget;
      axios
        .delete(`http://127.0.0.1:8000/api/materials/${material_id}/delete`)
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

  const materialsDetails = filteredMaterials.map((item, index) => (
    <tr key={index}>
      <td>{item.material_id}</td>
      <td>{item.material_name}</td>
      <td>{item.category}</td>
      <td>{item.unit}</td>
      <td>{item.initial_qty}</td>
      <td>{item.available_qty}</td>
      <td>
        <button
          className="btn btn-success"
          onClick={() => handleShow(item.material_id)}
        >
          <i className="bi bi-pencil-square"></i> {/* Edit icon */}
        </button>

        <button
          className="btn btn-danger"
          style={{ marginLeft: "5px" }}
          onClick={(e) => deletematerial(e, item.material_id)}
        >
          <i className="bi bi-trash"></i> {/* Delete icon */}
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
      <Header />
      <Sidebar />
      <PageTitle page="Materials" pages={["Materials"]} icon="bi bi-house-up" />
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
                  <AddMaterial />
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Unit</th>
                        <th>Initial Qty</th>
                        <th>Available</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{materialsDetails}</tbody>
                    <tfoot>
                      <tr></tr>
                    </tfoot>
                  </table>
                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredMaterials.length}
                    paginate={paginate}
                    className="custom-pagination"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal for editing materials */}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Material
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMaterialId && (
            <Editmaterials material_id={selectedMaterialId} />
          )}
        </Modal.Body>
        <Modal.Footer>
          {/* Hidden button for simulating modal close */}
          <button
            id="editMaterialModal"
            style={{ display: "none" }}
            data-bs-dismiss="modal"
          ></button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Materials;
