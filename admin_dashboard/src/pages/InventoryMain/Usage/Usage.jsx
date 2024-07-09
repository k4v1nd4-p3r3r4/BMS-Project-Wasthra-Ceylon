import "./usage.css";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import PageTitle from "../../../components/PageTitle/PageTitle";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Addusage from "./Addusage";
import Editusage from "./Editusage";
import Pagination from "../../../components/Pagination";
import SearchBox from "../../../components/SearchBox";

function Usage() {
  const pages = ["Usage"];
  const icon = "bi bi-house-up";

  const [modalShow, setModalShow] = useState(false);
  const [selectUsageId, setSelectedUsageId] = useState(null);

  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  const [usage, setUsage] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/usagematerials").then((res) => {
      console.log(res);
      setUsage(res.data.usage);
    });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredUsage = usage
    .filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  // Logic for rendering pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsage.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleShow = (usageId) => {
    setSelectedUsageId(usageId);
    setModalShow(true);
  };

  //this usage delete function
  const deleteUsage = (e, usage_id) => {
    e.preventDefault();
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this material?"
    );
    if (shouldDelete) {
      const thisClicked = e.currentTarget;
      axios
        .delete(
          `http://127.0.0.1:8000/api/usagematerials/${usage_id}/usagedelete`
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

  // Rendered usage details
  const UsageMaterialsDetails = filteredUsage.map((uitem, index) => (
    <tr key={index}>
      <td>{uitem.usage_id}</td>
      <td>{uitem.material_id}</td>
      <td>{uitem.date}</td>
      <td>{uitem.usage_qty}</td>
      <td>
        <button
          className="btn btn-success"
          onClick={() => handleShow(uitem.usage_id)}
        >
          <i className="bi bi-pencil-square"></i> {/* Edit icon */}
        </button>
        <button
          className="btn btn-danger"
          style={{ marginLeft: "5px" }}
          onClick={(e) => deleteUsage(e, uitem.usage_id)}
        >
          <i className="bi bi-trash"></i> {/* Edit icon */}
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <Header />
      <Sidebar />
      <PageTitle page="Usage" pages={pages} icon={icon} />
      <main id="main" className="main" style={{ marginTop: "2px" }}>
        <div className="container  tbl-container">
          <div className="row  tbl-fixed">
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
                  <Addusage />
                </div>

                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Usage Id</th>
                        <th>Material Id</th>
                        <th>Date</th>
                        <th>Qty</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{UsageMaterialsDetails}</tbody>
                  </table>

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredUsage.length}
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
            Edit Usage
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectUsageId && <Editusage usage_id={selectUsageId} />}
        </Modal.Body>
        <Modal.Footer>
          {/* Hidden button for simulating modal close */}
          <button
            id="editusageModal"
            style={{ display: "none" }}
            data-bs-dismiss="modal"
          ></button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Usage;
