import React from "react";
import { Link } from "react-router-dom";

const Home = ({ products, deleteProduct }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Product List
      </h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <li
            key={product._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden"
          >
            {/* Product Image */}
            <img
              src={product?.image}
              alt={product?.name}
              className="w-full h-48 sm:h-56 object-cover"
            />

            {/* Product Details */}
            <div className="p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-lg font-semibold text-green-600 mb-4">
                ${product?.price}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Link to={`/edit/${product._id}`} className="w-full">
                  <button className="bg-yellow-500 text-white px-4 py-2 w-full rounded-lg hover:bg-yellow-600 transition">
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => deleteProduct(product._id)}
                  className="bg-red-500 text-white px-4 py-2 w-full rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
