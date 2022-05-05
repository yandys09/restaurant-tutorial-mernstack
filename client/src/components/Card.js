import React from "react";

const Card = ({ product }) => (
  <div className="col-md-4 my-3">
    <div className="card h-100">
      <a href="#!">
        <img
          className="img-fluid w-100"
          src={`/uploads/${product.fileName}`}
          alt="product"
        />
      </a>
      <div className="card-body text-center">
        <h5>{product.productName}</h5>
        <hr />
        <h6 className="mb-3">
          <span className="text-secondary mr-2">
            {product.productPrice.toLocaleString("kr-KR", {
              style: "currency",
              currency: "KRW",
            
            })}
          </span>
        </h6>
      </div>
    </div>
  </div>
);

export default Card;
