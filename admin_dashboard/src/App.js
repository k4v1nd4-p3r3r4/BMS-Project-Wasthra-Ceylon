import "./App.css";
//import Header from "./components/Header";

//import bootstrap icons
import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";

//import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
//import Sidebar from "./components/Sidebar";
import MyRoutes from "./components/AppRoutes/MyRoutes";

function App() {
  return (
    <div className="content">
      <MyRoutes />
    </div>
  );
}

export default App;
