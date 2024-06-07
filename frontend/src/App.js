import "./App.css";
import { Fragment } from "react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/LoginComponent";
import AddProduct from "./pages/AddProduct";
import Home from "./pages/HomePage";
import UpdateProduct from "./pages/UpdatePage";
function App() {
  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<Home/>} />
          <Route path="/add" element={<AddProduct/>} />
          <Route path="/profile" element={<h1> User Component</h1>} />
          <Route path="/update/:id" element={<UpdateProduct/>} />
          <Route path="/logout" element={<h1>loged out</h1>} />
          <Route path="*" element={<h1> Component not found</h1>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
