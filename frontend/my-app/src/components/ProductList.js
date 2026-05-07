import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Product List</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-3">
            <div className="card p-3">
              {/* Wrap product name in Link */}
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h3>{product.name}</h3>
              </Link>
              <p>₹{product.price}</p>
              <p>{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
