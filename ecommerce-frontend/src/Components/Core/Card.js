import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

const Card = ({ product }) => {

  return (

    <div className="col-8 offset-2 col-sm-6 offset-sm-0 col-lg-3 mb-3">

      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
          
          <ShowImage product={product} url={'product'}/>
          <p>{product.description}</p>
          <p>Rs: {product.price}</p>
          <div className="d-sm-flex">
          <Link to="#" className="me-2">
            <button className="btn btn-outline-primary">View Product</button>
          </Link>
          <Link to="#">
            <button className="btn btn-outline-warning">Add to cart</button>
          </Link>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Card;

// this component represent the whole product in the form of card
