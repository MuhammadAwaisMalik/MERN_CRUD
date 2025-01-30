import React from "react";
import { Link } from "react-router-dom";

const Home = ({ products, deleteProduct }) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Product List</h1>

      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <li
            key={product._id}
            className="bg-white shadow-md rounded-lg p-5 border border-gray-200"
          >
            <img src={product?.image} alt={product?.name} />

            <h2 className="text-xl font-semibold text-gray-800">
              {product.name}
            </h2>
            <p className="text-lg font-bold text-green-600">
              ${product?.price}
            </p>

            <div className="flex flex-col gap-2 mt-4">
              <Link to={`/edit/${product._id}`} className="w-full">
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition w-full">
                  Edit
                </button>
              </Link>

              <button
                onClick={() => deleteProduct(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
