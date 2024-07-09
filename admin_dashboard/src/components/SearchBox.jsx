import React from "react";

function SearchBox({ searchTerm, handleSearchChange }) {
  return (
    <div className="float-left">
      <div className="input-group rounded" style={{ width: "200px" }}>
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
}

export default SearchBox;
