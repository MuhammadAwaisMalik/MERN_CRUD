import React, { useState, useEffect } from "react";
// @ import dependencies
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
// @ import components
import Navbar from "components/navbar";
// @ import api services
import { deleteData, getData } from "./data/apiService";
// @ import pages
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
// @ import slices
import { setLoader } from "store/slices/loaderSlice";

function App() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    dispatch(setLoader(true));
    getData("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  // Delete a product
  const deleteProduct = async (id) => {
    dispatch(setLoader(true));
    deleteData("/products/" + id)
      .then((res) => {
        toast.success(res?.message);
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home products={products} deleteProduct={deleteProduct} />}
        />
        <Route
          path="/add"
          element={<AddProduct fetchProducts={fetchProducts} />}
        />
        <Route
          path="/edit/:id"
          element={<EditProduct fetchProducts={fetchProducts} />}
        />
      </Routes>
    </>
  );
}

export default App;
