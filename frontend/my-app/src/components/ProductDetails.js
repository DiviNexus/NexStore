import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p className="card-text">{product.description}</p>
          <h4 className="text-success">₹{product.price}</h4>
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid mt-3 rounded"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
