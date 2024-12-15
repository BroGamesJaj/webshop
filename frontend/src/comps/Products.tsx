import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../contexts/AppContext";
import 'bootstrap/dist/css/bootstrap.min.css';


const Products: React.FC = () => {
  const { user, addToCart } = useAppContext();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
    console.log(user)
  useEffect(() => {
    axios.get("http://localhost:3000/products").then((res) => setProducts(res.data));
  }, []);

  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (a[sort] > b[sort] ? 1 : -1));

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Products</h1>
      
      <div className="mb-4 d-flex justify-content-between">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          className="form-select w-25"
          value={sort} 
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>

      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.desc}</p>
                <p className="card-text">
                  <strong>${product.price}</strong>
                </p>
                {user && (
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;