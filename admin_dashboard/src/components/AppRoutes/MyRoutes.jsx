import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Dashboard from "../../pages/InventoryMain/Dashboard/Dashboard";
import Materials from "../../pages/InventoryMain/Materials/Materials";
import Purchase from "../../pages/InventoryMain/Purchase/Purchase";
import Usage from "../../pages/InventoryMain/Usage/Usage";
import Productlist from "../../pages/InventoryMain/ProductList/Productlist";
import Manufactured from "../../pages/InventoryMain/ProductManufac/Manufactured";
import Productsales from "../../pages/InventoryMain/ProductSales/Productsales";
import Buyers from "../../pages/InventoryMain/Buyers/Buyers";
import Suppliers from "../../pages/InventoryMain/Suppliers/Suppliers";
import Users from "../../pages/EmployeesMain/Users/Users";
import AllEmp from "../../pages/EmployeesMain/Employees/AllEmp";
import Attendence from "../../pages/EmployeesMain/EmpAttendence/Attendence";
import Leaves from "../../pages/EmployeesMain/Leaves/Leaves";
import DailyTasks from "../../pages/EmployeesMain/DayTask/DailyTasks";
import DailyTransaction from "../../pages/FinanceMain/DayTransaction/DailyTransaction";
import Invoice from "../../pages/FinanceMain/Invoice/Invoice";
import Reports from "../../pages/FinanceMain/Reports/Reports";
import Editmaterials from "../../pages/InventoryMain/Materials/MaterialOperations/Editmaterials";
import FoodSale from "../../pages/InventoryMain/ProductSales/FoodSale";

import Register from "../../pages/Register/Register"

import Salaries from "../../pages/FinanceMain/Salaries/Salaries";
import AddSalary from "../../pages/FinanceMain/Salaries/AddSalary";
import MakePayment from "../../pages/FinanceMain/Salaries/MakePayment";

import Addexpence from "../../pages/FinanceMain/DayTransaction/Addexpence";
import InvoicePage from "../../pages/InventoryMain/ProductSales/InvoicePage";

import PurchaseInvoicePage from "../../pages/InventoryMain/Purchase/PurchaseInvoicePage";

import ItemInvoicePage from "../../pages/InventoryMain/ProductSales/ItemInvoicePage";

import EditSalary from "../../pages/FinanceMain/Salaries/EditSalary";

function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/materials" element={<Materials />} />
      <Route path="/purchase" element={<Purchase />} />
      <Route path="/invoice/:purchase_id" element={<PurchaseInvoicePage/>} />

      <Route path="/usage" element={<Usage />} />
      <Route path="/productlist" element={<Productlist />} />
      <Route path="/manufactured" element={<Manufactured />} />
      <Route path="/productsales" element={<Productsales />} />
      <Route path="/buyers" element={<Buyers />} />
      <Route path="/suppliers" element={<Suppliers />} />
      <Route path="/users" element={<Users />} />
      <Route path="/allemp" element={<AllEmp />} />
      <Route path="/attendence" element={<Attendence />} />
      <Route path="/leaves" element={<Leaves />} />
      <Route path="/dailytasks" element={<DailyTasks />} />
      <Route path="/dayilytransaction" element={<DailyTransaction />} />
      <Route path="dayilytransaction/addExpences" element={<Addexpence />} />
      <Route path="/invoice" element={<Invoice />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/foodsale" element={<FoodSale />} />
      <Route path="/foodsales/:sale_id/invoice" element={<InvoicePage/>} />

      <Route path="/itemsales/:sale_id/invoice" element={<ItemInvoicePage/>} />

      <Route path="salaries" element={<Salaries />} />
      <Route path="salaries/addSalary" element={<AddSalary />} />
      <Route path="/salaries/edit/:id" element={<EditSalary />} />
      <Route path="salaries/pay" element={<MakePayment />} />

      <Route
        path="Editmaterials/:material_id/edit"
        element={<Editmaterials />}
      />
    </Routes>
  );
}

export default MyRoutes;
