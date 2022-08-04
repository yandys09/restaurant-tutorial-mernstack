import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

const Product = ({ match, history }) => {
  const { productId } = match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  const { product } = useSelector((state) => state.products);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
   
  };
  const handleGoBackBtn = () => {
    history.goBack();
  };

  return (
    <div className="container">
      <section className="product-page my-4">
        <button
          to="/shop"
          className="btn btn-light text-primary"
          onClick={handleGoBackBtn}
        >
          Go Back
        </button>
        {product && (
          <div className="row">
            <div className="col-md-6">
              <img
                className="img-fluid w-100"
                src={`/uploads/${product.fileName}`}
                alt="product"
              />
            </div>
            <div className="col-md-5">
              <h3 className="mb-4">{product.productName}</h3>
              <p className="text-muted border-top">
                Price:{" "}
                {product.productPrice.toLocaleString("kr-KR", {
                  style: "currency",
                  currency: "KRW",
                })}
              </p>
              <p className="text-muted border-top">
                Status: {product.productQty <= 0 ? "Out of Stock" : "In stock"}
              </p>
              <p className="text-muted border-top">
                Description: {product.productDesc}
              </p>
              <button
                className="btn btn-dark btn-large btn-block mb-5 p-2"
                disabled={product.productQty <= 0}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Product;
