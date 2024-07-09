import axios from "axios";
//get material id
export const fetchMaterialIds = (setMaterialIds) => {
  axios
    .get("http://127.0.0.1:8000/api/materials")
    .then((res) => {
      if (res.data && Array.isArray(res.data.materials)) {
        const ids = res.data.materials.map((material) => material.material_id);
        setMaterialIds(ids);
      } else {
        console.error("Invalid response format:", res.data);
      }
    })
    .catch((error) => {
      console.error("Error fetching material IDs:", error);
    });
};

//get supplier id
export const fetchSupplierIds = (setSupplierIds) => {
  axios
    .get("http://127.0.0.1:8000/api/suppliers")
    .then((res) => {
      console.log("Supplier IDs response:", res.data); // Log the response
      if (res.data && Array.isArray(res.data.supplier)) {
        const ids = res.data.supplier.map((supplier) => supplier.supplier_id);
        setSupplierIds(ids);
      } else {
        console.error("Invalid response format:", res.data);
      }
    })
    .catch((error) => {
      console.error("Error fetching supplier IDs:", error);
    });
};

//get food id
export const fetchFoodIds = (setFoodIds) => {
  axios
    .get("http://127.0.0.1:8000/api/foodlist")
    .then((res) => {
      console.log("Food IDs response:", res.data); // Log the response
      if (res.data && Array.isArray(res.data.data)) {
        const ids = res.data.data.map((food) => food.food_id);
        setFoodIds(ids);
      } else {
        console.error("Invalid response format:", res.data);
      }
    })
    .catch((error) => {
      console.error("Error fetching food IDs:", error);
    });
};

//get items id
export const fetchItemIds = (setItemIds) => {
  axios
    .get("http://127.0.0.1:8000/api/handlist")
    .then((res) => {
      if (res.data && Array.isArray(res.data.data)) {
        const ids = res.data.data.map((item) => item.item_id);
        setItemIds(ids);
      } else {
        console.error("Invalid response format:", res.data);
      }
    })
    .catch((error) => {
      console.error("Error fetching handlist items:", error);
    });
};

//customer id
export const fetchCustomerIds = (setCustomerIds) => {
  axios
    .get("http://127.0.0.1:8000/api/customers")
    .then((res) => {
      if (res.data && Array.isArray(res.data.data)) {
        const ids = res.data.data.map((customer) => customer.customer_id);
        setCustomerIds(ids);
      } else {
        console.error("Invalid response format:", res.data);
      }
    })
    .catch((error) => {
      console.error("Error fetching customer IDs:", error);
    });
};
